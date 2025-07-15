export const ROUTES = {
  HOME: '/',
  
  // Auth routes (legacy compatibility)
  LOGIN: '/login',
  REGISTER: '/register',
  
  // New auth routes structure
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  
  // Theme routes
  THEMES: '/themes',
  THEMES_CREATE: '/themes/create',
  THEME_DETAIL: '/themes/:id',
  THEME_EDIT: '/themes/:id/edit',
  
  // Profile routes
  PROFILE: '/profile',
  PROFILE_SECTION: '/profile/:section',
} as const;

export type RouteValues = typeof ROUTES[keyof typeof ROUTES];

// Helper functions to generate dynamic routes
export const generateThemeDetailRoute = (id: string) => `/themes/${id}`;
export const generateThemeEditRoute = (id: string) => `/themes/${id}/edit`;
export const generateProfileSectionRoute = (section: string) => `/profile/${section}`;