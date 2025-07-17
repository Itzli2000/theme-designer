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
  themeConfig: ThemeConfig;
  previewImage: string | null;
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

interface ThemeConfig {
  palette: Palette;
}

interface Palette {
  mode: string;
  primary: Primary;
  secondary: Primary;
}

interface Primary {
  main: string;
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
}

/**
 * Combines dashboard state and actions
 */
export type ThemesStore = ThemesState & ThemesActions;