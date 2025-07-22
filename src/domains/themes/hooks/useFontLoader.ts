import { useState, useCallback } from 'react';
import WebFont from 'webfontloader';

interface FontLoadState {
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const useFontLoader = () => {
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());
  const [fontStates, setFontStates] = useState<Record<string, FontLoadState>>({});

  const loadFont = useCallback((fontFamily: string) => {
    if (loadedFonts.has(fontFamily) || fontStates[fontFamily]?.loading) {
      return Promise.resolve();
    }

    setFontStates(prev => ({
      ...prev,
      [fontFamily]: { loading: true, loaded: false, error: false }
    }));

    return new Promise<void>((resolve, reject) => {
      WebFont.load({
        google: {
          families: [fontFamily]
        },
        active: () => {
          setLoadedFonts(prev => new Set([...prev, fontFamily]));
          setFontStates(prev => ({
            ...prev,
            [fontFamily]: { loading: false, loaded: true, error: false }
          }));
          resolve();
        },
        inactive: () => {
          setFontStates(prev => ({
            ...prev,
            [fontFamily]: { loading: false, loaded: false, error: true }
          }));
          reject(new Error(`Failed to load font: ${fontFamily}`));
        }
      });
    });
  }, [loadedFonts, fontStates]);

  const loadMultipleFonts = useCallback(async (fontFamilies: string[]) => {
    const loadPromises = fontFamilies.map(font => loadFont(font));
    
    try {
      await Promise.allSettled(loadPromises);
    } catch (error) {
      console.warn('Some fonts failed to load:', error);
    }
  }, [loadFont]);

  const getFontState = useCallback((fontFamily: string): FontLoadState => {
    return fontStates[fontFamily] || { loading: false, loaded: false, error: false };
  }, [fontStates]);

  const isFontLoaded = useCallback((fontFamily: string): boolean => {
    return loadedFonts.has(fontFamily);
  }, [loadedFonts]);

  const preloadFonts = useCallback((fonts: string[]) => {
    const unloadedFonts = fonts.filter(font => !loadedFonts.has(font));
    if (unloadedFonts.length > 0) {
      loadMultipleFonts(unloadedFonts);
    }
  }, [loadedFonts, loadMultipleFonts]);

  return {
    loadFont,
    loadMultipleFonts,
    getFontState,
    isFontLoaded,
    preloadFonts,
    loadedFonts: Array.from(loadedFonts),
  };
};