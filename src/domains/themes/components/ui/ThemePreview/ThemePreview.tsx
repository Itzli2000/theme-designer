import { Box } from '@mui/material';
import { ThemeProvider } from '@shared/components';
import { DemoComponents } from '@shared/components';
import { ReactNode } from 'react';
import type { MuiThemeConfig } from '../../../types/theme.types';

interface ThemePreviewProps {
  themeConfig: MuiThemeConfig;
  children?: ReactNode;
  showDemo?: boolean;
  demoComponents?: ReactNode;
}

export const ThemePreview = ({
  themeConfig,
  children,
  showDemo = true,
  demoComponents,
}: ThemePreviewProps) => {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <ThemeProvider config={themeConfig}>
        <Box
          sx={{
            p: 2,
            bgcolor: 'background.default',
            color: 'text.primary',
            minHeight: '100%',
          }}
        >
          {children || (showDemo && (demoComponents || <DemoComponents />))}
        </Box>
      </ThemeProvider>
    </Box>
  );
};