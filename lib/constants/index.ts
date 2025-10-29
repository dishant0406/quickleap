export const LOGOUT_ENDPOINT = '/api/auth/logout';

export enum RedirectType {
  Permanent = 'permanent',
  Temporary = 'temporary',
}

// Static assets base URL
export const STATIC_ASSETS_BASE_URL = 'https://static-asset.quickleap.io/Features%20Images';

// Helper function to create static image URLs
export const createStaticImageURL = (imageName: string): string => {
  return `${STATIC_ASSETS_BASE_URL}/${imageName}`;
};

// Export analytics constants
export * from './analytics';
