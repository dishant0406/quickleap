'use client';

import { CalendarCheck, CreditCard, FileClock, GithubIcon, LogOut, Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Session from 'supertokens-web-js/recipe/session';

import GoogleIcon from '@/components/icons/GoogleIcon';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { githubSignInClicked, googleSignInClicked } from '@/lib/helpers/supertoken/config';
import useUserStore from '@/lib/zustand/user';

import AvatarWithToolTip from '.';

const CONTEXT_MENU_ITEMS = [
  {
    label: 'Plans',
    icon: CreditCard,
    onClick: (router: ReturnType<typeof useRouter>) => {
      router.push('/app/plans');
    },
  },
  {
    label: 'Subscription',
    icon: CalendarCheck,
    onClick: (router: ReturnType<typeof useRouter>) => {
      router.push('/app/subscription');
    },
  },
  {
    label: 'Billing',
    icon: Wallet,
    onClick: (router: ReturnType<typeof useRouter>) => {
      router.push('/app/billing');
    },
  },
  {
    label: 'Payment History',
    icon: FileClock,
    onClick: (router: ReturnType<typeof useRouter>) => {
      router.push('/app/payment-history');
    },
  },
  {
    label: 'Logout',
    icon: LogOut,
    onClick: async (_router: ReturnType<typeof useRouter>) => {
      await Session.signOut();
      window?.location?.reload();
    },
  },
];

const LoginAvatar: React.FC<{
  user?: User;
  children?: React.ReactNode;
}> = ({ children }) => {
  const { isLoggedIn, user } = useUserStore();
  const router = useRouter();

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
              {CONTEXT_MENU_ITEMS.map((item) => (
                <Button
                  key={item.label}
                  className="w-full justify-start"
                  tooltipDirection="bottom"
                  variant="neutral"
                  onClick={() => item.onClick(router)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              ))}
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
            <div className="w-full flex flex-col gap-3 mt-4">
              <Button
                className="!w-full"
                tooltipDirection="bottom"
                variant="neutral"
                onClick={() => githubSignInClicked()}
              >
                <GithubIcon className="w-4 h-4" />
                Github
              </Button>
              <Button
                className="!w-full"
                tooltipDirection="bottom"
                variant="neutral"
                onClick={() => googleSignInClicked()}
              >
                <GoogleIcon className="w-4 h-4" />
                Google
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LoginAvatar;
