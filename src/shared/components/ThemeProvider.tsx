import type { Theme } from '@domains/themes/store/types';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { DemoComponents } from './DemoComponents';

interface ThemeProviderProps {
  selectedTheme?: Theme | null;
  children?: ReactNode;
}

export const ThemeProvider = ({ selectedTheme, children }: ThemeProviderProps) => {
  const muiTheme = useMemo(() => {
    if (!selectedTheme?.themeConfig) {
      return createTheme();
    }

    return createTheme({
      palette: {
        mode: selectedTheme.themeConfig.palette.mode as 'light' | 'dark',
        primary: {
          main: selectedTheme.themeConfig.palette.primary.main,
        },
        secondary: {
          main: selectedTheme.themeConfig.palette.secondary.main,
        },
      },
    });
  }, [selectedTheme]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children || <DemoComponents />}
    </MuiThemeProvider>
  );
};