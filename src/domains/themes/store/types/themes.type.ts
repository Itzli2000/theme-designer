/**
 * Represents a theme in the dashboard.
 */
export interface ThemeResponse {
  data: Theme[];
  total: number;
  page: number;
  limit: number;
}

export interface Theme {
  id: string;
  name: string;
  description: string | null;
  themeConfig: MuiThemeConfig;
  previewImage: string | null;
  googleFonts: string[] | null;
  tags: string[] | null;
  isActive: boolean;
  createdById: string;
  updatedById: string;
  createdBy: CreatedBy;
  updatedBy: CreatedBy;
  createdAt: string;
  updatedAt: string;
}

export interface CreatedBy {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MuiPaletteColor {
  main: string;
  dark?: string;
  light?: string;
  contrastText?: string;
}

export interface MuiPalette {
  mode?: 'light' | 'dark';
  primary?: MuiPaletteColor;
  secondary?: MuiPaletteColor;
  error?: MuiPaletteColor;
  warning?: MuiPaletteColor;
  info?: MuiPaletteColor;
  success?: MuiPaletteColor;
}

export interface MuiTypographyVariant {
  fontFamily?: string;
  fontWeight?: number;
  fontSize?: string;
  lineHeight?: number;
  letterSpacing?: string;
}

export interface MuiTypography {
  fontFamily?: string;
  fontSize?: number;
  fontWeightLight?: number;
  fontWeightRegular?: number;
  fontWeightMedium?: number;
  fontWeightBold?: number;
  h1?: MuiTypographyVariant;
  h2?: MuiTypographyVariant;
  h3?: MuiTypographyVariant;
  h4?: MuiTypographyVariant;
  h5?: MuiTypographyVariant;
  h6?: MuiTypographyVariant;
  subtitle1?: MuiTypographyVariant;
  subtitle2?: MuiTypographyVariant;
  body1?: MuiTypographyVariant;
  body2?: MuiTypographyVariant;
  button?: MuiTypographyVariant;
  caption?: MuiTypographyVariant;
  overline?: MuiTypographyVariant;
  [key: string]: MuiTypographyVariant | string | number | undefined;
}

export interface MuiShape {
  borderRadius?: number;
}

export interface MuiThemeConfig {
  palette?: MuiPalette;
  typography?: MuiTypography;
  shape?: MuiShape;
  spacing?: number;
  shadows?: string[];
  transitions?: Record<string, unknown>;
  zIndex?: Record<string, unknown>;
  breakpoints?: Record<string, unknown>;
  components?: Record<string, unknown>;
}

/**
 * Represents the dashboard state.
 */
export interface ThemesState {
  /**
   * Pagination information
   */
  pagination?: Omit<ThemeResponse, 'data'>;
  /**
   * List of themes
   */
  themes?: Theme[];
  /**
   * Currently selected theme
   */
  selectedTheme?: Theme | null;
  /**
   * Loading state
   */
  isLoading: boolean;
  /**
   * Error message
   */
  error: string | null;
}

/**
 * Dashboard actions
 */
export interface ThemesActions {
  /**
   * Fetches all themes
   */
  fetchThemes: () => Promise<void>;
  /**
   * Creates a new theme
   */
  createTheme: (theme: Omit<Theme, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => Promise<void>;
  /**
   * Updates an existing theme
   */
  updateTheme: (id: string, theme: Partial<Theme>) => Promise<void>;
  /**
   * Deletes a theme
   */
  deleteTheme: (id: string) => Promise<void>;
  /**
   * Sets the selected theme
   */
  setSelectedTheme: (theme: Theme | null) => void;
  /**
   * Sets pagination information
   */
  setPagination: (pagination: Omit<ThemeResponse, 'data'>) => void;
  /**
   * Sets loading state
   */
  setLoading: (loading: boolean) => void;
  /**
   * Sets error message
   */
  setError: (error: string | null) => void;
  /**
   * Clears error message
   */
  clearError: () => void;
  /**
   * Loads Google Fonts for a specific theme
   */
  loadThemeFonts: (theme: Theme) => Promise<void>;
  /**
   * Loads Google Fonts for the currently selected theme
   */
  loadSelectedThemeFonts: () => Promise<void>;
  /**
   * Sets the selected theme and loads its fonts
   */
  setSelectedThemeWithFonts: (theme: Theme | null) => Promise<void>;
}

/**
 * Combines dashboard state and actions
 */
export type ThemesStore = ThemesState & ThemesActions;