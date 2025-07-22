export const PREDEFINED_COLORS = [
  { name: 'Blue', value: '#1976d2' },
  { name: 'Purple', value: '#9c27b0' },
  { name: 'Green', value: '#388e3c' },
  { name: 'Orange', value: '#f57c00' },
  { name: 'Red', value: '#d32f2f' },
  { name: 'Teal', value: '#0097a7' },
  { name: 'Pink', value: '#c2185b' },
  { name: 'Indigo', value: '#303f9f' },
  { name: 'Cyan', value: '#00acc1' },
  { name: 'Lime', value: '#689f38' },
  { name: 'Deep Orange', value: '#e64a19' },
  { name: 'Brown', value: '#5d4037' },
] as const;

export const THEME_STEPS = [
  { label: 'Basic Info', icon: 'InfoIcon' },
  { label: 'Colors', icon: 'ColorLensIcon' },
  { label: 'Typography', icon: 'TextFieldsIcon' },
  { label: 'Preview', icon: 'CheckCircleIcon' },
] as const;

export const DEVICE_BREAKPOINTS = {
  desktop: { width: 1200, height: 800, label: 'Desktop' },
  tablet: { width: 768, height: 1024, label: 'Tablet' },
  mobile: { width: 375, height: 667, label: 'Mobile' },
} as const;

export const THEME_MODES = ['light', 'dark'] as const;

export const DEFAULT_TYPOGRAPHY = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: 14,
} as const;

export const DEFAULT_THEME_CONFIG = {
  palette: {
    mode: 'light' as const,
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: DEFAULT_TYPOGRAPHY,
} as const;