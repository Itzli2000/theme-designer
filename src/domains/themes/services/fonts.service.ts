import WebFont from 'webfontloader';

export interface GoogleFont {
  family: string;
  variants: string[];
  subsets: string[];
  category: string;
  kind: string;
  files: Record<string, string>;
}

export interface GoogleFontsResponse {
  kind: string;
  items: GoogleFont[];
}

export interface FontVariant {
  weight: string;
  style: 'normal' | 'italic';
  display: string;
}

export interface LoadedFont {
  family: string;
  variants: FontVariant[];
  loaded: boolean;
}

class FontsService {
  private static instance: FontsService;
  private loadedFonts: Map<string, LoadedFont> = new Map();
  private fontsCache: GoogleFont[] | null = null;

  static getInstance(): FontsService {
    if (!FontsService.instance) {
      FontsService.instance = new FontsService();
    }
    return FontsService.instance;
  }

  async getGoogleFonts(): Promise<GoogleFont[]> {
    if (this.fontsCache) {
      return this.fontsCache;
    }

    // Always use fallback fonts - no API key required
    this.fontsCache = this.getFallbackFonts();
    return this.fontsCache;
  }

  private getFallbackFonts(): GoogleFont[] {
    return [
      // Sans-serif fonts
      {
        family: 'Roboto',
        variants: ['100', '300', '400', '500', '700', '900'],
        subsets: ['latin', 'latin-ext'],
        category: 'sans-serif',
        kind: 'webfonts#webfont',
        files: {}
      },
      {
        family: 'Open Sans',
        variants: ['300', '400', '600', '700', '800'],
        subsets: ['latin', 'latin-ext'],
        category: 'sans-serif',
        kind: 'webfonts#webfont',
        files: {}
      },
      {
        family: 'Lato',
        variants: ['100', '300', '400', '700', '900'],
        subsets: ['latin', 'latin-ext'],
        category: 'sans-serif',
        kind: 'webfonts#webfont',
        files: {}
      },
      {
        family: 'Montserrat',
        variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
        subsets: ['latin', 'latin-ext'],
        category: 'sans-serif',
        kind: 'webfonts#webfont',
        files: {}
      },
      {
        family: 'Source Sans Pro',
        variants: ['200', '300', '400', '600', '700', '900'],
        subsets: ['latin', 'latin-ext'],
        category: 'sans-serif',
        kind: 'webfonts#webfont',
        files: {}
      },
      {
        family: 'Poppins',
        variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
        subsets: ['latin', 'latin-ext'],
        category: 'sans-serif',
        kind: 'webfonts#webfont',
        files: {}
      },
      {
        family: 'Inter',
        variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
        subsets: ['latin', 'latin-ext'],
        category: 'sans-serif',
        kind: 'webfonts#webfont',
        files: {}
      },
      {
        family: 'Nunito',
        variants: ['200', '300', '400', '600', '700', '800', '900'],
        subsets: ['latin', 'latin-ext'],
        category: 'sans-serif',
        kind: 'webfonts#webfont',
        files: {}
      },
      {
        family: 'Work Sans',
        variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
        subsets: ['latin', 'latin-ext'],
        category: 'sans-serif',
        kind: 'webfonts#webfont',
        files: {}
      },
      {
        family: 'Rubik',
        variants: ['300', '400', '500', '600', '700', '800', '900'],
        subsets: ['latin', 'latin-ext'],
        category: 'sans-serif',
        kind: 'webfonts#webfont',
        files: {}
      },
      
      // Serif fonts
      {
        family: 'Playfair Display',
        variants: ['400', '500', '600', '700', '800', '900'],
        subsets: ['latin', 'latin-ext'],
        category: 'serif',
        kind: 'webfonts#webfont',
        files: {}
      },
      {
        family: 'Merriweather',
        variants: ['300', '400', '700', '900'],
        subsets: ['latin', 'latin-ext'],
        category: 'serif',
        kind: 'webfonts#webfont',
        files: {}
      },
      {
        family: 'Lora',
        variants: ['400', '500', '600', '700'],
        subsets: ['latin', 'latin-ext'],
        category: 'serif',
        kind: 'webfonts#webfont',
        files: {}
      },
      {
        family: 'Crimson Text',
        variants: ['400', '600', '700'],
        subsets: ['latin', 'latin-ext'],
        category: 'serif',
        kind: 'webfonts#webfont',
        files: {}
      },
      {
        family: 'Source Serif Pro',
        variants: ['200', '300', '400', '600', '700', '900'],
        subsets: ['latin', 'latin-ext'],
        category: 'serif',
        kind: 'webfonts#webfont',
        files: {}
      },
      
      // Display fonts
      {
        family: 'Oswald',
        variants: ['200', '300', '400', '500', '600', '700'],
        subsets: ['latin', 'latin-ext'],
        category: 'display',
        kind: 'webfonts#webfont',
        files: {}
      },
      {
        family: 'Raleway',
        variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
        subsets: ['latin', 'latin-ext'],
        category: 'display',
        kind: 'webfonts#webfont',
        files: {}
      },
      {
        family: 'Fjalla One',
        variants: ['400'],
        subsets: ['latin', 'latin-ext'],
        category: 'display',
        kind: 'webfonts#webfont',
        files: {}
      },
      
      // Monospace fonts
      {
        family: 'Fira Code',
        variants: ['300', '400', '500', '600', '700'],
        subsets: ['latin', 'latin-ext'],
        category: 'monospace',
        kind: 'webfonts#webfont',
        files: {}
      },
      {
        family: 'Source Code Pro',
        variants: ['200', '300', '400', '500', '600', '700', '900'],
        subsets: ['latin', 'latin-ext'],
        category: 'monospace',
        kind: 'webfonts#webfont',
        files: {}
      },
      {
        family: 'JetBrains Mono',
        variants: ['100', '200', '300', '400', '500', '600', '700', '800'],
        subsets: ['latin', 'latin-ext'],
        category: 'monospace',
        kind: 'webfonts#webfont',
        files: {}
      },
      
      // Handwriting fonts
      {
        family: 'Dancing Script',
        variants: ['400', '500', '600', '700'],
        subsets: ['latin', 'latin-ext'],
        category: 'handwriting',
        kind: 'webfonts#webfont',
        files: {}
      },
      {
        family: 'Pacifico',
        variants: ['400'],
        subsets: ['latin', 'latin-ext'],
        category: 'handwriting',
        kind: 'webfonts#webfont',
        files: {}
      }
    ];
  }

  async searchFonts(query: string, category?: string): Promise<GoogleFont[]> {
    const fonts = await this.getGoogleFonts();
    
    return fonts.filter(font => {
      const matchesQuery = query === '' || 
        font.family.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || font.category === category;
      
      return matchesQuery && matchesCategory;
    });
  }

  async loadFont(fontFamily: string, variants: string[] = ['400']): Promise<void> {
    return new Promise((resolve, reject) => {
      const fontKey = `${fontFamily}:${variants.join(',')}`;
      
      if (this.loadedFonts.has(fontKey)) {
        resolve();
        return;
      }

      const webFontVariants = variants.map(variant => {
        if (variant.includes('italic')) {
          return variant.replace('italic', 'i');
        }
        return variant;
      });

      WebFont.load({
        google: {
          families: [`${fontFamily}:${webFontVariants.join(',')}`]
        },
        active: () => {
          this.loadedFonts.set(fontKey, {
            family: fontFamily,
            variants: variants.map(v => ({
              weight: v.replace(/italic/i, ''),
              style: v.includes('italic') ? 'italic' : 'normal',
              display: v
            })),
            loaded: true
          });
          resolve();
        },
        inactive: () => {
          reject(new Error(`Failed to load font: ${fontFamily}`));
        }
      });
    });
  }

  async loadMultipleFonts(fonts: Array<{ family: string; variants?: string[] }>): Promise<void> {
    const loadPromises = fonts.map(({ family, variants = ['400'] }) =>
      this.loadFont(family, variants)
    );

    await Promise.allSettled(loadPromises);
  }

  getLoadedFonts(): LoadedFont[] {
    return Array.from(this.loadedFonts.values());
  }

  isFontLoaded(fontFamily: string): boolean {
    return Array.from(this.loadedFonts.keys()).some(key => 
      key.startsWith(fontFamily)
    );
  }

  getFontCategories(): string[] {
    return ['sans-serif', 'serif', 'display', 'handwriting', 'monospace'];
  }

  parseVariantWeight(variant: string): number {
    const weight = variant.replace(/italic/i, '').replace(/i$/, '');
    return parseInt(weight) || 400;
  }

  getVariantStyle(variant: string): 'normal' | 'italic' {
    return variant.includes('italic') || variant.includes('i') ? 'italic' : 'normal';
  }

  getPopularFonts(limit: number = 20): Promise<GoogleFont[]> {
    return this.getGoogleFonts().then(fonts => fonts.slice(0, limit));
  }

  getFontsByCategory(category: string): Promise<GoogleFont[]> {
    return this.getGoogleFonts().then(fonts => 
      fonts.filter(font => font.category === category)
    );
  }

  clearCache(): void {
    this.fontsCache = null;
    this.loadedFonts.clear();
  }
}

export const fontsService = FontsService.getInstance();
export default fontsService;