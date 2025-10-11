export const env = {
  // API Endpoints
  NEXT_PUBLIC_WEBSITE_SCREENSHOT_API_ENDPOINT:
    process.env.NEXT_PUBLIC_WEBSITE_SCREENSHOT_API_ENDPOINT || 'https://api.lazyweb.rocks/ss',
  NEXT_PUBLIC_LAZYWEB_BACKEND_URL:
    process.env.NEXT_PUBLIC_LAZYWEB_BACKEND_URL || 'https://redirect.quickleap.io',
  NEXT_PUBLIC_META_DATA_ENDPOINT:
    process.env.NEXT_PUBLIC_META_DATA_ENDPOINT || 'https://api.lazyweb.rocks/metadata',

  // App Domains
  NEXT_PUBLIC_WEBSITE_DOMAIN: process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || 'https://quickleap.io',
  NEXT_PUBLIC_API_DOMAIN: process.env.NEXT_PUBLIC_API_DOMAIN || 'https://redirect.quickleap.io',
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://quickleap.io',

  // Auth Callback URLs
  NEXT_PUBLIC_GITHUB_CALLBACK_URI:
    process.env.NEXT_PUBLIC_GITHUB_CALLBACK_URI || 'https://quickleap.io/auth/callback/github',

  // CDN URLs
  NEXT_PUBLIC_DICEBEAR_API_URL:
    process.env.NEXT_PUBLIC_DICEBEAR_API_URL || 'https://api.dicebear.com/9.x/adventurer-neutral',
  NEXT_PUBLIC_OG_IMAGE_URL:
    process.env.NEXT_PUBLIC_OG_IMAGE_URL ||
    'https://cdn.jsdelivr.net/gh/dishant0406/images-repo@master/og.png',
  NEXT_PUBLIC_COUNTRY_FLAGS_CDN:
    process.env.NEXT_PUBLIC_COUNTRY_FLAGS_CDN ||
    'https://cdn.jsdelivr.net/gh/hjnilsson/country-flags@latest/svg',

  // Analytics
  NEXT_PUBLIC_UMAMI_WEBSITE_ID:
    process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || '485db16a-1058-49de-b9b8-adb7e2bf2ff0',
  NEXT_PUBLIC_UMAMI_SCRIPT_URL:
    process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js',
};
