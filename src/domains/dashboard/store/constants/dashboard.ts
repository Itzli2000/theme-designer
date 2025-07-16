import type { DashboardState } from "../types";

/**
 * Initial state for the dashboard store
 */
export const dashboardInitialState: DashboardState = {
  themes: [],
  selectedTheme: null,
  isLoading: false,
  error: null,
};