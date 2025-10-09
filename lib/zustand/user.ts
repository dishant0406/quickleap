import { create } from 'zustand';

import axiosClient from '../helpers/axios/client';

const useUserStore = create<{
  user: UserResponse | null;
  setUser: (user: UserResponse | null) => void;
  fetchUser: () => Promise<void>;
  isLoggedIn: boolean;
}>((set) => ({
  user: null,
  setUser: (user) =>
    set({
      user,
      isLoggedIn: !!user?.user?.id,
    }),
  fetchUser: async () => {
    try {
      const response = await axiosClient.get<UserResponse>('/auth/user');
      set({
        user: response.data,
        isLoggedIn: !!response.data?.user?.id,
      });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  },
  isLoggedIn: false,
}));

export default useUserStore;
