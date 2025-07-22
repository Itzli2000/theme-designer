import type { MuiThemeConfig } from '../types/theme.types';
import type { Theme } from '../store/types';
import { DEFAULT_THEME_CONFIG } from './constants';

export const createEmptyTheme = (): Partial<Theme> => ({
  name: '',
  description: '',
  themeConfig: DEFAULT_THEME_CONFIG,
  googleFonts: [],
});

export const validateThemeName = (name: string): string | null => {
  if (!name.trim()) {
    return 'Theme name is required';
  }
  if (name.length < 3) {
    return 'Theme name must be at least 3 characters';
  }
  if (name.length > 50) {
    return 'Theme name must be less than 50 characters';
  }
  return null;
};

export const validateThemeDescription = (description: string): string | null => {
  if (description.length > 200) {
    return 'Description must be less than 200 characters';
  }
  return null;
};

export const isValidHexColor = (color: string): boolean => {
  return /^#([0-9A-F]{3}){1,2}$/i.test(color);
};

export const getContrastColor = (hexColor: string): string => {
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

export const mergeThemeConfig = (
  baseConfig: MuiThemeConfig,
  updates: Partial<MuiThemeConfig>
): MuiThemeConfig => {
  return {
    ...baseConfig,
    ...updates,
    palette: {
      ...baseConfig.palette,
      ...updates.palette,
    },
    typography: {
      ...baseConfig.typography,
      ...updates.typography,
    },
  };
};

export const hasThemeChanges = (
  original: Theme | null,
  current: Partial<Theme>
): boolean => {
  if (!original) return false;
  
  return (
    original.name !== current.name ||
    original.description !== current.description ||
    JSON.stringify(original.themeConfig) !== JSON.stringify(current.themeConfig) ||
    JSON.stringify(original.googleFonts) !== JSON.stringify(current.googleFonts)
  );
};