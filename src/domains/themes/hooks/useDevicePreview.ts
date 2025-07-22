import { useState, useCallback, useMemo } from 'react';
import { DEVICE_BREAKPOINTS } from '../utils/constants';

type DeviceType = keyof typeof DEVICE_BREAKPOINTS;

export const useDevicePreview = (initialDevice: DeviceType = 'desktop') => {
  const [activeDevice, setActiveDevice] = useState<DeviceType>(initialDevice);

  const deviceConfig = useMemo(() => 
    DEVICE_BREAKPOINTS[activeDevice], 
    [activeDevice]
  );

  const switchDevice = useCallback((device: DeviceType) => {
    setActiveDevice(device);
  }, []);

  const getDeviceStyles = useCallback(() => ({
    width: deviceConfig.width,
    height: deviceConfig.height,
    transition: 'width 0.3s ease, height 0.3s ease',
    border: '1px solid #e0e0e0',
    borderRadius: activeDevice === 'mobile' ? '20px' : '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  }), [deviceConfig, activeDevice]);

  const availableDevices = useMemo(() => 
    Object.entries(DEVICE_BREAKPOINTS).map(([key, config]) => ({
      key: key as DeviceType,
      ...config,
    })), 
    []
  );

  return {
    activeDevice,
    deviceConfig,
    availableDevices,
    switchDevice,
    getDeviceStyles,
  };
};