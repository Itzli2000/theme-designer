import {
  Box,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Computer as ComputerIcon,
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
} from '@mui/icons-material';
import type { ReactNode } from 'react';
import { useDevicePreview } from '../../../hooks';
import { DEVICE_BREAKPOINTS } from '../../../utils/constants';

interface DevicePreviewProps {
  children: ReactNode;
  initialDevice?: 'desktop' | 'tablet' | 'mobile';
  showDeviceToggle?: boolean;
  onDeviceChange?: (device: 'desktop' | 'tablet' | 'mobile') => void;
}

const deviceIcons = {
  desktop: ComputerIcon,
  tablet: TabletIcon,
  mobile: SmartphoneIcon,
};

export const DevicePreview = ({
  children,
  initialDevice = 'desktop',
  showDeviceToggle = true,
  onDeviceChange,
}: DevicePreviewProps) => {
  const { 
    activeDevice, 
    deviceConfig, 
    availableDevices, 
    switchDevice, 
    getDeviceStyles 
  } = useDevicePreview(initialDevice);

  const handleDeviceChange = (device: 'desktop' | 'tablet' | 'mobile') => {
    switchDevice(device);
    onDeviceChange?.(device);
  };

  return (
    <Box>
      {showDeviceToggle && (
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Preview Device:
          </Typography>
          <ToggleButtonGroup
            value={activeDevice}
            exclusive
            onChange={(_, newDevice) => {
              if (newDevice) handleDeviceChange(newDevice);
            }}
            size="small"
          >
            {availableDevices.map(({ key, label }) => {
              const Icon = deviceIcons[key];
              return (
                <ToggleButton key={key} value={key}>
                  <Tooltip title={`${label} (${DEVICE_BREAKPOINTS[key].width}x${DEVICE_BREAKPOINTS[key].height})`}>
                    <Icon fontSize="small" />
                  </Tooltip>
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
          <Typography variant="caption" color="text.secondary">
            {deviceConfig.width} × {deviceConfig.height}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          p: 2,
          bgcolor: 'grey.50',
          borderRadius: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            ...getDeviceStyles(),
            position: 'relative',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'grey.400',
                borderRadius: '3px',
              },
            }}
          >
            {children}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};