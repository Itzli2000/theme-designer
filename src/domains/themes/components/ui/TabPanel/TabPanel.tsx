import { Box, type BoxProps } from '@mui/material';
import { type ReactNode } from 'react';

interface TabPanelProps extends BoxProps {
  children?: ReactNode;
  index: number;
  value: number;
  keepMounted?: boolean;
}

const TabPanel = ({ 
  children, 
  value, 
  index, 
  keepMounted = false,
  sx,
  ...other 
}: TabPanelProps) => {
  const isActive = value === index;
  const shouldRender = isActive || keepMounted;

  return (
    <Box
      role="tabpanel"
      hidden={!isActive}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      sx={{
        py: 3,
        display: isActive ? 'block' : 'none',
        ...sx,
      }}
      {...other}
    >
      {shouldRender && children}
    </Box>
  );
};

export default TabPanel;