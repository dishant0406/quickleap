'use client';

import type { JSX } from 'react';
import { useEffect } from 'react';

import { GhostIcon } from 'lucide-react';

import CreateRedirect from '@/components/Micro/CreateRedirect';
import Loader from '@/components/Micro/Loader';
import LoginAvatar from '@/components/Navbar/Avatar/LoginAvatar';
import RedirectsTable from '@/components/RedirectsTable';
import { Button } from '@/components/ui/button';
import useRedirectStore from '@/lib/zustand';
import usePlansStore from '@/lib/zustand/plans';
import useUserStore from '@/lib/zustand/user';

type Props = {
  redirectsServer: Redirect[];
};

const Screen = ({ redirectsServer }: Props): JSX.Element => {
  const { redirects, fetchRedirects, fetching } = useRedirectStore();
  const { isLoggedIn } = useUserStore();
  const { fetchAndSetPlan } = usePlansStore();

  useEffect(() => {
    if (isLoggedIn) {
      fetchRedirects();
      fetchAndSetPlan();
    }
  }, [isLoggedIn, fetchRedirects]);

  // Determine which data source to use
  const displayRedirects = redirects && redirects.length > 0 ? redirects : redirectsServer;
  const hasRedirects = displayRedirects && displayRedirects.length > 0;

  // Show loading only when fetching and no data available
  if (fetching && !hasRedirects) {
    return (
      <Loader
        description="Please wait while we fetch your redirects"
        size={200}
        title="Loading Redirects..."
      />
    );
  }

  // Show empty state
  if (!hasRedirects) {
    return (
      <Loader lottieClassName="h-[400px] w-[400px]" lottiePath="/no-data.lottie" size={200}>
        <div className="text-center mt-4">
          <h2 className="text-xl font-bold">
            {isLoggedIn ? 'No Redirects Found' : 'Sign in to get started'}
          </h2>
          <p className="text-gray-400 mb-4 mt-2">
            {isLoggedIn
              ? 'Create a new redirect to get started'
              : 'Login to view and manage your redirects'}
          </p>
          {isLoggedIn && <CreateRedirect />}
          {!isLoggedIn && (
            <LoginAvatar>
              <Button className="font-bold">
                <GhostIcon className="w-4 h-4" fontWeight={500} />
                Login
              </Button>
            </LoginAvatar>
          )}
        </div>
      </Loader>
    );
  }

  // Show redirects table
  return (
    <div className="h-main mt-nav overflow-y-auto p-4 md:p-8">
      <div className="w-full flex items-center justify-between">
        <h1 className="md:text-2xl text-xl font-bold">Redirects</h1>
        <div className="flex justify-end gap-4">
          <CreateRedirect />
        </div>
      </div>
      <div className="w-full mt-8">
        <RedirectsTable redirects={displayRedirects} />
      </div>
    </div>
  );
};

export default Screen;
