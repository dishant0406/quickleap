'use client';

import { GithubIcon } from 'lucide-react';
import Session from 'supertokens-web-js/recipe/session';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { githubSignInClicked } from '@/lib/helpers/supertoken/config';
import useUserStore from '@/lib/zustand/user';

import AvatarWithToolTip from '.';

const LoginAvatar: React.FC<{
  user?: User;
  children?: React.ReactNode;
}> = ({ children }) => {
  const { fetchUser, isLoggedIn, user } = useUserStore();

  const handleLogout = async () => {
    await Session.signOut();

    await fetchUser();
    window?.location?.reload();
  };

  if (isLoggedIn) {
    return (
      <Popover>
        <PopoverTrigger>{children || <AvatarWithToolTip user={user?.user} />}</PopoverTrigger>
        <PopoverContent className="w-80" sideOffset={5}>
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Logout</h4>
              <p className="text-sm text-muted-foreground">Logout from your account.</p>
            </div>
            <div className="grid gap-2">
              <div className="w-full flex items-center gap-4">
                <Button
                  className="w-full"
                  tooltip="Logout"
                  tooltipDirection="bottom"
                  variant="neutral"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover>
      <PopoverTrigger>{children || <AvatarWithToolTip />}</PopoverTrigger>
      <PopoverContent className="w-80" sideOffset={5}>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Login</h4>
            <p className="text-sm text-muted-foreground">
              Login to access your dashboard and manage your redirects.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="w-full flex items-center gap-4 mt-4">
              <Button
                className="!w-full"
                tooltipDirection="bottom"
                variant="neutral"
                onClick={() => githubSignInClicked()}
              >
                <GithubIcon className="w-4 h-4" />
                Github
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LoginAvatar;
