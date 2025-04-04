import { cookies } from 'next/headers';

import { getUserData } from '@/lib/helpers/getUserData';

import NavLogo from '../Micro/NavLogo';

import LoginAvatar from './Avatar/LoginAvatar';

const Navbar: React.FC = async () => {
  const token = (await cookies()).get('token')?.value;
  const { user } = await getUserData(token);

  return (
    <div className="mx-auto z-50 fixed top-0 left-0 items-center border-b-4 border-border dark:border-darkNavBorder bg-white dark:bg-secondaryBlack px-5 pl-3 m500:h-16  w-full flex h-nav justify-between border-input">
      <NavLogo />
      <LoginAvatar user={user || undefined} />
    </div>
  );
};

export default Navbar;
