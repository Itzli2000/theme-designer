import { useState, useCallback, useMemo } from 'react';
import { PREDEFINED_COLORS } from '../utils/constants';
import { 
  findPredefinedColor, 
  generateColorVariations,
  hexToRgb,
  rgbToHex
} from '../utils/colorUtils';

export const useColorPalette = () => {
  const [customColors, setCustomColors] = useState<Array<{name: string, value: string}>>([]);
  const [recentColors, setRecentColors] = useState<string[]>([]);

  const allColors = useMemo(() => [
    ...PREDEFINED_COLORS,
    ...customColors
  ], [customColors]);

  const addCustomColor = useCallback((name: string, value: string) => {
    const newColor = { name, value };
    setCustomColors(prev => {
      const exists = prev.some(color => color.value.toLowerCase() === value.toLowerCase());
      if (exists) return prev;
      return [...prev, newColor];
    });
  }, []);

  const removeCustomColor = useCallback((value: string) => {
    setCustomColors(prev => prev.filter(color => color.value !== value));
  }, []);

  const addToRecent = useCallback((color: string) => {
    setRecentColors(prev => {
      const filtered = prev.filter(c => c !== color);
      return [color, ...filtered].slice(0, 10); // Keep only 10 recent colors
    });
  }, []);

  const getColorInfo = useCallback((color: string) => {
    const predefined = findPredefinedColor(color);
    const custom = customColors.find(c => c.value.toLowerCase() === color.toLowerCase());
    const variations = generateColorVariations(color);
    const rgb = hexToRgb(color);
    
    return {
      hex: color,
      rgb,
      name: predefined?.name || custom?.name || color,
      isPredefined: !!predefined,
      isCustom: !!custom,
      variations,
    };
  }, [customColors]);

  const suggestComplementaryColors = useCallback((baseColor: string) => {
    const rgb = hexToRgb(baseColor);
    if (!rgb) return [];

    // Simple complementary color calculation
    const complementary = rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b);
    
    // Triadic colors (120 degrees apart on color wheel)
    const triadic1 = rgbToHex(rgb.g, rgb.b, rgb.r);
    const triadic2 = rgbToHex(rgb.b, rgb.r, rgb.g);

    return [complementary, triadic1, triadic2];
  }, []);

  const getColorAccessibility = useCallback((foreground: string, background: string) => {
    const fgRgb = hexToRgb(foreground);
    const bgRgb = hexToRgb(background);
    
    if (!fgRgb || !bgRgb) return { ratio: 0, level: 'fail' };

    // Calculate relative luminance
    const getLuminance = (r: number, g: number, b: number) => {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const fgLuminance = getLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
    const bgLuminance = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);

    const ratio = (Math.max(fgLuminance, bgLuminance) + 0.05) / 
                  (Math.min(fgLuminance, bgLuminance) + 0.05);

    let level: 'fail' | 'aa-large' | 'aa' | 'aaa' = 'fail';
    if (ratio >= 7) level = 'aaa';
    else if (ratio >= 4.5) level = 'aa';
    else if (ratio >= 3) level = 'aa-large';

    return { ratio: Math.round(ratio * 100) / 100, level };
  }, []);

  return {
    predefinedColors: PREDEFINED_COLORS,
    customColors,
    recentColors,
    allColors,
    addCustomColor,
    removeCustomColor,
    addToRecent,
    getColorInfo,
    suggestComplementaryColors,
    getColorAccessibility,
  };
};