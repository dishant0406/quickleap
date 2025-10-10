export const env = {
  NEXT_PUBLIC_WEBSITE_SCREENSHOT_API_ENDPOINT:
    process.env.NEXT_PUBLIC_WEBSITE_SCREENSHOT_API_ENDPOINT || 'https://api.lazyweb.rocks/ss',
  NEXT_PUBLIC_LAZYWEB_BACKEND_URL: 'https://redirect.quickleap.io',
  NEXT_PUBLIC_META_DATA_ENDPOINT:
    process.env.NEXT_PUBLIC_META_DATA_ENDPOINT || 'https://api.lazyweb.rocks/metadata',
};
