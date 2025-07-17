import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Palette as PaletteIcon,
  Visibility as VisibilityIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useThemesStore } from '../store';
import { ThemeProvider, DemoComponents } from '@shared/components';
import type { CreatedBy } from '../store/types';

const steps = ['Basic Info', 'Colors', 'Preview'];

const ThemeCreate = () => {
  const { createTheme } = useThemesStore();
  const [activeStep, setActiveStep] = useState(0);
  const [newTheme, setNewTheme] = useState({
    name: '',
    description: '',
    themeConfig: {
      palette: {
        mode: 'light' as 'light' | 'dark',
        primary: {
          main: '#1976d2',
        },
        secondary: {
          main: '#dc004e',
        },
      },
    },
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleColorChange = (colorType: 'primary' | 'secondary', value: string) => {
    setNewTheme(prev => ({
      ...prev,
      themeConfig: {
        ...prev.themeConfig,
        palette: {
          ...prev.themeConfig.palette,
          [colorType]: {
            ...prev.themeConfig.palette[colorType],
            main: value,
          },
        },
      },
    }));
  };

  const handleModeChange = (mode: 'light' | 'dark') => {
    setNewTheme(prev => ({
      ...prev,
      themeConfig: {
        ...prev.themeConfig,
        palette: {
          ...prev.themeConfig.palette,
          mode,
        },
      },
    }));
  };

  const handleCreateTheme = async () => {
    try {
      const themeToCreate = {
        ...newTheme,
        id: '',
        previewImage: null,
        tags: null,
        isActive: true,
        createdById: '',
        updatedById: '',
        createdBy: {} as CreatedBy,
        updatedBy: {} as CreatedBy,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await createTheme(themeToCreate);
      // Reset form or navigate away
      setNewTheme({
        name: '',
        description: '',
        themeConfig: {
          palette: {
            mode: 'light',
            primary: { main: '#1976d2' },
            secondary: { main: '#dc004e' },
          },
        },
      });
      setActiveStep(0);
    } catch (error) {
      console.error('Error creating theme:', error);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Theme Name"
              value={newTheme.name}
              onChange={(e) => setNewTheme(prev => ({ ...prev, name: e.target.value }))}
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              label="Description"
              value={newTheme.description}
              onChange={(e) => setNewTheme(prev => ({ ...prev, description: e.target.value }))}
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              helperText="Optional: Describe your theme's purpose and style"
            />
            <FormControl fullWidth>
              <InputLabel>Theme Mode</InputLabel>
              <Select
                value={newTheme.themeConfig.palette.mode}
                label="Theme Mode"
                onChange={(e) => handleModeChange(e.target.value as 'light' | 'dark')}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
              </Select>
            </FormControl>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Primary Colors</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Primary Color"
                    type="color"
                    value={newTheme.themeConfig.palette.primary.main}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label="Primary"
                      sx={{ bgcolor: newTheme.themeConfig.palette.primary.main, color: 'white' }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {newTheme.themeConfig.palette.primary.main}
                    </Typography>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Secondary Colors</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Secondary Color"
                    type="color"
                    value={newTheme.themeConfig.palette.secondary.main}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label="Secondary"
                      sx={{ bgcolor: newTheme.themeConfig.palette.secondary.main, color: 'white' }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {newTheme.themeConfig.palette.secondary.main}
                    </Typography>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Alert severity="info">
              <Typography variant="body2">
                Review your theme before creating it. You can always edit it later.
              </Typography>
            </Alert>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6">Theme Summary</Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip label={`Name: ${newTheme.name}`} />
                <Chip label={`Mode: ${newTheme.themeConfig.palette.mode}`} />
                <Chip
                  label="Primary"
                  sx={{ bgcolor: newTheme.themeConfig.palette.primary.main, color: 'white' }}
                />
                <Chip
                  label="Secondary"
                  sx={{ bgcolor: newTheme.themeConfig.palette.secondary.main, color: 'white' }}
                />
              </Box>
            </Box>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <PaletteIcon />
        Create New Theme
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Box sx={{ mb: 4 }}>
                {getStepContent(activeStep)}
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {activeStep === steps.length - 1 ? (
                  <Button
                    onClick={handleCreateTheme}
                    variant="contained"
                    size="large"
                    startIcon={<SaveIcon />}
                    disabled={!newTheme.name.trim()}
                  >
                    Create Theme
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    disabled={activeStep === 0 && !newTheme.name.trim()}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <VisibilityIcon />
                Live Preview
              </Typography>
              <Box
                sx={{
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  overflow: 'hidden',
                  minHeight: '500px',
                }}
              >
                <ThemeProvider selectedTheme={{
                  ...newTheme,
                  id: 'preview',
                  previewImage: null,
                  tags: null,
                  isActive: true,
                  createdById: '',
                  updatedById: '',
                  createdBy: {} as CreatedBy,
                  updatedBy: {} as CreatedBy,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                }}>
                  <DemoComponents />
                </ThemeProvider>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ThemeCreate;