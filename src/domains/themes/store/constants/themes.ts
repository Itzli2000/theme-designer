import type { ThemesState } from "../types";

/**
 * Initial state for the dashboard store
 */
export const themesInitialState: ThemesState = {
  themes: [],
  selectedTheme: null,
  isLoading: false,
  error: null,
};