'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Tooltip from '@/components/ui/tooltip';
import { env } from '@/lib/env';
import useUserStore from '@/lib/zustand/user';

type UserAvatarProps = {
  email?: string;
  showShimmer?: boolean;
};

const UserAvatar: React.FC<UserAvatarProps> = ({
  email,
  showShimmer = false, // Default to true for backward compatibility
}) => {
  return (
    <div className="relative">
      <Avatar className="border rounded-full border-input bg-input overflow-hidden">
        <AvatarImage
          src={`${env.NEXT_PUBLIC_DICEBEAR_API_URL}/svg?seed=${email}&backgroundColor=ffdc58,c0aede,d1d4f9`}
        />
        <AvatarFallback className="w-full h-full flex items-center rounded-full justify-center">
          {email?.charAt(0).toUpperCase()}
        </AvatarFallback>

        {/* Smooth glass-like shimmer effect overlay */}
        {showShimmer && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent animate-smooth-shimmer" />
          </div>
        )}
      </Avatar>
    </div>
  );
};

const AvatarWithToolTip: React.FC<{
  user?: User;
}> = ({ user }) => {
  const { isLoggedIn } = useUserStore();
  return (
    <Tooltip content={user?.email || 'Login'}>
      <UserAvatar email={user?.email} showShimmer={!isLoggedIn} />
    </Tooltip>
  );
};

export default AvatarWithToolTip;
