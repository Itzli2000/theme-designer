import { create } from "zustand";
import { dashboardInitialState } from "./constants";
import type { DashboardStore } from "./types";
import { DASHBOARD_SERVICE } from "../services/dashboard";
import { AxiosError } from "axios";

export const useDashboardStore = create<DashboardStore>()((set, get) => ({
  ...dashboardInitialState,

  fetchThemes: async () => {
    set({ isLoading: true, error: null });

    try {
      const themes = await DASHBOARD_SERVICE.getThemes();
      
      set({
        themes,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof AxiosError 
          ? error.response?.data.message || "Failed to fetch themes"
          : "Failed to fetch themes",
      });
    }
  },

  createTheme: async (themeData) => {
    set({ isLoading: true, error: null });

    try {
      const newTheme = await DASHBOARD_SERVICE.createTheme(themeData);
      const currentThemes = get().themes;
      
      set({
        themes: [...currentThemes, newTheme],
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof AxiosError 
          ? error.response?.data.message || "Failed to create theme"
          : "Failed to create theme",
      });
    }
  },

  updateTheme: async (id, themeData) => {
    set({ isLoading: true, error: null });

    try {
      const updatedTheme = await DASHBOARD_SERVICE.updateTheme(id, themeData);
      const currentThemes = get().themes;
      
      set({
        themes: currentThemes.map(theme => 
          theme.id === id ? updatedTheme : theme
        ),
        selectedTheme: get().selectedTheme?.id === id ? updatedTheme : get().selectedTheme,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof AxiosError 
          ? error.response?.data.message || "Failed to update theme"
          : "Failed to update theme",
      });
    }
  },

  deleteTheme: async (id) => {
    set({ isLoading: true, error: null });

    try {
      await DASHBOARD_SERVICE.deleteTheme(id);
      const currentThemes = get().themes;
      
      set({
        themes: currentThemes.filter(theme => theme.id !== id),
        selectedTheme: get().selectedTheme?.id === id ? null : get().selectedTheme,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof AxiosError 
          ? error.response?.data.message || "Failed to delete theme"
          : "Failed to delete theme",
      });
    }
  },

  setSelectedTheme: (theme) => {
    set({ selectedTheme: theme });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setError: (error) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },
}));