'use client';

import { useEffect } from 'react';

import { GithubIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { handleGithubCallback } from '@/lib/helpers/supertoken/config';
import useUserStore from '@/lib/zustand/user';

const Github = () => {
  const router = useRouter();
  const { fetchUser } = useUserStore();
  useEffect(() => {
    handleGithubCallback(router, fetchUser);
  }, []);

  return (
    <div className="h-main flex flex-col items-center justify-center">
      <GithubIcon className="w-20 h-20 text-white bg-[#24292e] p-4 animate-pulse rounded-full" />
      <p className="mt-4 text-lg">Logging you in with GitHub...</p>
    </div>
  );
};

export default Github;
