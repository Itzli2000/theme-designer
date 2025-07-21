import type { Theme } from "@domains/themes/store/types";
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  type ThemeOptions,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { useMemo } from "react";
import type { ReactNode } from "react";
import { DemoComponents } from "./DemoComponents";

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

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children || <DemoComponents />}
    </MuiThemeProvider>
  );
};
