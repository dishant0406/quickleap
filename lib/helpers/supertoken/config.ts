import { toast } from 'sonner';
import SessionWebJs from 'supertokens-web-js/recipe/session';
import ThirdParty, {
  getAuthorisationURLWithQueryParamsAndSetState,
  signInAndUp,
} from 'supertokens-web-js/recipe/thirdparty';

import { appInfo } from '@/lib/constants/appInfo';
import { env } from '@/lib/env';

import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { SuperTokensConfig } from 'supertokens-web-js/types';

export const frontendConfig = (): SuperTokensConfig => {
  return {
    appInfo: appInfo,
    recipeList: [ThirdParty.init(), SessionWebJs.init()],
  };
};

export const githubSignInClicked = async () => {
  try {
    const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
      thirdPartyId: 'github',

      // This is where GitHub should redirect the user back after login or error.
      // This URL goes on the GitHub's dashboard as well.
      frontendRedirectURI: env.NEXT_PUBLIC_GITHUB_CALLBACK_URI,
    });

    // we redirect the user to github for auth.
    window.location.assign(authUrl);
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true && typeof window !== 'undefined') {
      // this may be a custom error message sent from the API by you.
      toast.error(err.message);
    } else {
      toast.error('Oops! Something went wrong.');
    }
  }
};

export const handleGithubCallback = async (
  router: AppRouterInstance,
  fetchUser: () => Promise<void>
) => {
  try {
    const response = await signInAndUp();

    if (response.status === 'OK') {
      if (response.createdNewRecipeUser && response.user.loginMethods.length === 1) {
        // sign up successful
      } else {
        // sign in successful
      }
      await fetchUser();
      router.replace('/app');
    } else if (response.status === 'SIGN_IN_UP_NOT_ALLOWED') {
      // the reason string is a user friendly message
      // about what went wrong. It can also contain a support code which users
      // can tell you so you know why their sign in / up was not allowed.
      toast.info(response.reason);
    } else {
      // SuperTokens requires that the third party provider
      // gives an email for the user. If that's not the case, sign up / in
      // will fail.

      // As a hack to solve this, you can override the backend functions to create a fake email for the user.

      toast.info('No email provided by social login. Please use another form of login');
      window.location.assign('/auth'); // redirect back to login page
    }
  } catch (err: any) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      toast.error(err.message);
    } else {
      toast.error('Oops! Something went wrong.');
    }
  }
};
