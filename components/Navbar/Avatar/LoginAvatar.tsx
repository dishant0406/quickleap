'use client';

import { CreditCard, GithubIcon, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
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
              <h4 className="font-medium leading-none">Account</h4>
              <p className="text-muted-foreground text-sm">Manage your account and subscription.</p>
            </div>
            <div className="grid gap-2">
              <Button
                className="w-full justify-start"
                tooltip="View Plans"
                tooltipDirection="bottom"
                variant="neutral"
                onClick={() => router.push('/app/plans')}
              >
                <CreditCard className="h-4 w-4" />
                Plans
              </Button>
              <Button
                className="w-full justify-start"
                tooltip="Logout"
                tooltipDirection="bottom"
                variant="neutral"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
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
