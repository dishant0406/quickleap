'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import GoogleIcon from '@/components/icons/GoogleIcon';
import { handleGoogleCallback } from '@/lib/helpers/supertoken/config';
import useUserStore from '@/lib/zustand/user';

const Google = () => {
  const router = useRouter();
  const { fetchUser } = useUserStore();

  useEffect(() => {
    handleGoogleCallback(router, fetchUser);
  }, [router, fetchUser]);

  return (
    <div className="h-main flex flex-col items-center justify-center">
      <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center animate-pulse">
        <GoogleIcon className="w-14 h-14" />
      </div>
      <p className="mt-4 text-lg">Logging you in with Google...</p>
    </div>
  );
};

export default Google;
