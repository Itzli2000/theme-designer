import httpClient from "@shared/services/http";
import type { Theme, ThemeResponse } from "../store/types";

const getThemes = async () => {
  const response = await httpClient.get<ThemeResponse>("/themes");
  return response;
};

const createTheme = async (
  theme: Omit<Theme, "id" | "createdAt" | "updatedAt" | "userId">
) => {
  const response = await httpClient.post<Theme>("/themes", theme);
  return response;
};

const updateTheme = async (id: string, theme: Partial<Theme>) => {
  const {
    name,
    description,
    themeConfig,
    tags,
  } = theme;
  const response = await httpClient.patch<Theme>(`/themes/${id}`, {
    name,
    description,
    themeConfig,
    tags,
  });
  return response;
};

const deleteTheme = async (id: string) => {
  await httpClient.delete(`/themes/${id}`);
};

export const THEMES_SERVICE = {
  getThemes,
  createTheme,
  updateTheme,
  deleteTheme,
};
