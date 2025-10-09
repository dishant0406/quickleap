import { create } from 'zustand';

import { getUserRedirects } from '../api';

interface RedirectState {
  redirects: Redirect[];
  setRedirects: (redirects: Redirect[]) => void;
  fetchRedirects: () => Promise<void>;
  fetching: boolean;
}

const useRedirectStore = create<RedirectState>((set) => ({
  redirects: [],
  setRedirects: (redirects) => set({ redirects }),
  fetchRedirects: async () => {
    set({ fetching: true });
    const { data } = await getUserRedirects();
    const redirects = data.redirects;
    set({ redirects, fetching: false });
  },
  fetching: false,
}));

export default useRedirectStore;
