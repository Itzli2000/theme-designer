/**
 * Represents a theme in the dashboard.
 */
export interface Theme {
  /**
   * Theme ID
   */
  id: string;
  /**
   * Theme name
   */
  name: string;
  /**
   * Theme description
   */
  description?: string;
  /**
   * Theme configuration
   */
  config: Record<string, unknown>;
  /**
   * Creation date
   */
  createdAt: string;
  /**
   * Last updated date
   */
  updatedAt: string;
  /**
   * User ID who created the theme
   */
  userId: string;
}

/**
 * Represents the dashboard state.
 */
export interface DashboardState {
  /**
   * List of themes
   */
  themes: Theme[];
  /**
   * Currently selected theme
   */
  selectedTheme: Theme | null;
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
export interface DashboardActions {
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
export type DashboardStore = DashboardState & DashboardActions;