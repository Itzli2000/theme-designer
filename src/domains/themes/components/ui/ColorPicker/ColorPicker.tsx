import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import { useState } from 'react';
import { useColorPalette } from '../../../hooks';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  disabled?: boolean;
  showPredefined?: boolean;
  showRecent?: boolean;
  size?: 'small' | 'medium';
}

export const ColorPicker = ({
  label,
  value,
  onChange,
  disabled = false,
  showPredefined = true,
  showRecent = true,
  size = 'medium',
}: ColorPickerProps) => {
  const { predefinedColors, recentColors, addToRecent } = useColorPalette();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleColorChange = (newColor: string) => {
    onChange(newColor);
    addToRecent(newColor);
  };

  const colorButtonSize = {
    small: 24,
    medium: 32,
    large: 40,
  }[size];

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" fontWeight="medium">
        {label}
      </Typography>
      
      <MuiColorInput
        value={value}
        onChange={handleColorChange}
        disabled={disabled}
        size={size}
        fullWidth
        format="hex"
      />

      {showPredefined && (
        <Box>
          <Typography variant="caption" color="text.secondary" gutterBottom>
            Predefined Colors
          </Typography>
          <Grid container spacing={1} sx={{ mt: 0.5 }}>
            {predefinedColors.map((color) => (
              <Grid key={color.value} size={{ xs: 'auto' }}>
                <Tooltip title={color.name}>
                  <Paper
                    component="button"
                    onClick={() => handleColorChange(color.value)}
                    disabled={disabled}
                    sx={{
                      width: colorButtonSize,
                      height: colorButtonSize,
                      backgroundColor: color.value,
                      border: value === color.value ? 2 : 1,
                      borderColor: value === color.value ? 'primary.main' : 'divider',
                      borderRadius: 1,
                      cursor: disabled ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': disabled ? {} : {
                        transform: 'scale(1.1)',
                        borderColor: 'primary.main',
                      },
                    }}
                  />
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {showRecent && recentColors.length > 0 && (
        <Box>
          <Typography variant="caption" color="text.secondary" gutterBottom>
            Recent Colors
          </Typography>
          <Grid container spacing={1} sx={{ mt: 0.5 }}>
            {recentColors.slice(0, 8).map((color, index) => (
              <Grid key={`${color}-${index}`} size={{ xs: 'auto' }}>
                <Tooltip title={color}>
                  <Paper
                    component="button"
                    onClick={() => handleColorChange(color)}
                    disabled={disabled}
                    sx={{
                      width: colorButtonSize,
                      height: colorButtonSize,
                      backgroundColor: color,
                      border: value === color ? 2 : 1,
                      borderColor: value === color ? 'primary.main' : 'divider',
                      borderRadius: 1,
                      cursor: disabled ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': disabled ? {} : {
                        transform: 'scale(1.1)',
                        borderColor: 'primary.main',
                      },
                    }}
                  />
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Button
        variant="text"
        size="small"
        onClick={() => setShowAdvanced(!showAdvanced)}
        sx={{ alignSelf: 'flex-start' }}
      >
        {showAdvanced ? 'Hide' : 'Show'} Advanced Options
      </Button>

      {showAdvanced && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Advanced color options coming soon...
          </Typography>
        </Paper>
      )}
    </Stack>
  );
};