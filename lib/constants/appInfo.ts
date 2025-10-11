import { env } from '../env';

export const appInfo = {
  appName: 'vocapp',
  websiteDomain: env.NEXT_PUBLIC_WEBSITE_DOMAIN,
  apiDomain: env.NEXT_PUBLIC_API_DOMAIN,
  apiBasePath: '/auth',
};
