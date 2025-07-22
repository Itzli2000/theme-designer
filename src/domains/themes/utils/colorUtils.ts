import { PREDEFINED_COLORS } from './constants';

export const generateColorVariations = (baseColor: string) => {
  // Simple color variation generator
  const hex = baseColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  return {
    50: `rgb(${Math.min(255, r + 200)}, ${Math.min(255, g + 200)}, ${Math.min(255, b + 200)})`,
    100: `rgb(${Math.min(255, r + 150)}, ${Math.min(255, g + 150)}, ${Math.min(255, b + 150)})`,
    200: `rgb(${Math.min(255, r + 100)}, ${Math.min(255, g + 100)}, ${Math.min(255, b + 100)})`,
    300: `rgb(${Math.min(255, r + 50)}, ${Math.min(255, g + 50)}, ${Math.min(255, b + 50)})`,
    400: `rgb(${Math.max(0, r + 25)}, ${Math.max(0, g + 25)}, ${Math.max(0, b + 25)})`,
    500: baseColor,
    600: `rgb(${Math.max(0, r - 25)}, ${Math.max(0, g - 25)}, ${Math.max(0, b - 25)})`,
    700: `rgb(${Math.max(0, r - 50)}, ${Math.max(0, g - 50)}, ${Math.max(0, b - 50)})`,
    800: `rgb(${Math.max(0, r - 100)}, ${Math.max(0, g - 100)}, ${Math.max(0, b - 100)})`,
    900: `rgb(${Math.max(0, r - 150)}, ${Math.max(0, g - 150)}, ${Math.max(0, b - 150)})`,
  };
};

export const findPredefinedColor = (color: string) => {
  return PREDEFINED_COLORS.find(predefined => 
    predefined.value.toLowerCase() === color.toLowerCase()
  );
};

export const isPredefinedColor = (color: string): boolean => {
  return PREDEFINED_COLORS.some(predefined => 
    predefined.value.toLowerCase() === color.toLowerCase()
  );
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};