export const THEME_ATTRIBUTE = 'data-theme';

export const THEME_OPTIONS = {
  dark: 'dark',
  light: 'light',
  system: 'system'
} as const;

export const THEME_STORAGE_KEY = 'app-theme';

export type Theme = (typeof THEME_OPTIONS)[keyof typeof THEME_OPTIONS];
