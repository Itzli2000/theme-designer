import type { Theme } from "@domains/themes/store/types";
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  type ThemeOptions,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { DemoComponents } from "./DemoComponents";
import { fontsService } from "@domains/themes/services/fonts.service";

interface ThemeProviderProps {
  selectedTheme?: Theme | null;
  children?: ReactNode;
}

export const ThemeProvider = ({
  selectedTheme,
  children,
}: ThemeProviderProps) => {
  const muiTheme = useMemo(() => {
    if (!selectedTheme?.themeConfig) {
      return createTheme();
    }

    return createTheme({ ...selectedTheme.themeConfig } as ThemeOptions);
  }, [selectedTheme]);

  // Load Google Fonts when theme changes
  useEffect(() => {
    if (selectedTheme?.googleFonts && selectedTheme.googleFonts.length > 0) {
      const loadFonts = async () => {
        try {
          const fontPromises = selectedTheme.googleFonts!.map(fontFamily => 
            fontsService.loadFont(fontFamily)
          );
          await Promise.allSettled(fontPromises);
        } catch (error) {
          console.warn('Failed to load theme fonts:', error);
        }
      };
      
      loadFonts();
    }
  }, [selectedTheme?.googleFonts]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children || <DemoComponents />}
    </MuiThemeProvider>
  );
};
