import { create } from "zustand";
import { persist } from "zustand/middleware";
import { themesInitialState } from "./constants";
import type { ThemesStore, ThemeResponse } from "./types";
import { THEMES_SERVICE } from "../services/themes";
import { AxiosError } from "axios";

export const useThemesStore = create<ThemesStore>()(
  persist(
    (set, get) => ({
      ...themesInitialState,

      fetchThemes: async () => {
        set({ isLoading: true, error: null });

        try {
          const response = await THEMES_SERVICE.getThemes();

          const { data, ...pagination } = response;
          
          set({
            themes: data,
            pagination: pagination as Omit<ThemeResponse, 'data'>,
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
          const newTheme = await THEMES_SERVICE.createTheme(themeData);
          const currentThemes = get().themes;
          
          set({
            themes: [...(currentThemes || []), newTheme],
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
          const updatedTheme = await THEMES_SERVICE.updateTheme(id, themeData);
          const currentThemes = get().themes;
          
          set({
            themes: currentThemes?.map(theme => 
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
          await THEMES_SERVICE.deleteTheme(id);
          const currentThemes = get().themes;
          
          set({
            themes: currentThemes?.filter(theme => theme.id !== id),
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

      setPagination: (pagination) => {
        set({ pagination });
      },
    }),
    {
      name: "themes-store",
      partialize: (state) => ({
        themes: state.themes,
        selectedTheme: state.selectedTheme,
        pagination: state.pagination,
      }),
    }
  )
);