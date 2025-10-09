'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import useUserStore from '@/lib/zustand/user';

import NavLogo from '../Micro/NavLogo';

import LoginAvatar from './Avatar/LoginAvatar';

const Navbar: React.FC<Props> = ({ user }) => {
  const { setUser } = useUserStore();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, []);
  return (
    <div className="mx-auto z-50 fixed top-0 left-0 items-center border-b-4 border-border dark:border-darkNavBorder bg-white dark:bg-secondaryBlack md:px-[10vw] px-2  w-full flex h-nav justify-between border-input">
      <NavLogo />
      <div className="flex items-center gap-4">
        <Link
          className="text-primaryBlack dark:text-white font-bold text-lg hover:text-main transition-colors"
          href="/app"
        >
          Dashboard
        </Link>
        <LoginAvatar user={user?.user || undefined} />
      </div>
    </div>
  );
};

type Props = {
  user?: UserResponse;
};

export default Navbar;
