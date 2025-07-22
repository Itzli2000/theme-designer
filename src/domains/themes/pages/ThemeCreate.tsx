import { ROUTES } from '@app/router/constants';
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  ColorLens as ColorLensIcon,
  Computer as ComputerIcon,
  DarkMode as DarkModeIcon,
  Info as InfoIcon,
  Lightbulb as LightbulbIcon,
  Save as SaveIcon,
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
  TextFields as TextFieldsIcon,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Fade,
  Grid,
  LinearProgress,
  Link,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import { DemoComponents, ThemeProvider } from '@shared/components';
import { MuiColorInput } from 'mui-color-input';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router';
import { useThemesStore } from '../store';
import type { CreatedBy } from '../store/types';
import { TypographyEditor } from '../components/TypographyEditor';
import type { MuiThemeConfig } from '../types/theme.types';

const steps = [
  { label: 'Basic Info', icon: InfoIcon },
  { label: 'Colors', icon: ColorLensIcon },
  { label: 'Typography', icon: TextFieldsIcon },
  { label: 'Preview', icon: CheckCircleIcon },
];

const predefinedColors = [
  { name: 'Blue', value: '#1976d2' },
  { name: 'Purple', value: '#9c27b0' },
  { name: 'Green', value: '#388e3c' },
  { name: 'Orange', value: '#f57c00' },
  { name: 'Red', value: '#d32f2f' },
  { name: 'Teal', value: '#0097a7' },
  { name: 'Pink', value: '#c2185b' },
  { name: 'Indigo', value: '#303f9f' },
  { name: 'Cyan', value: '#00acc1' },
  { name: 'Lime', value: '#689f38' },
  { name: 'Deep Orange', value: '#e64a19' },
  { name: 'Brown', value: '#5d4037' },
];

const ThemeCreate = () => {
  const { createTheme } = useThemesStore();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isCreating, setIsCreating] = useState(false);
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
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
      } as MuiThemeConfig['typography'],
    },
    googleFonts: [] as string[],
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

  const handleDeviceChange = (_event: React.MouseEvent<HTMLElement>, newDevice: 'desktop' | 'tablet' | 'mobile') => {
    if (newDevice !== null) {
      setPreviewDevice(newDevice);
    }
  };

  const handleTypographyChange = (typography: MuiThemeConfig['typography']) => {
    setNewTheme(prev => ({
      ...prev,
      themeConfig: {
        ...prev.themeConfig,
        typography,
      },
    }));
  };

  const handleGoogleFontsChange = (fonts: string[]) => {
    setNewTheme(prev => ({
      ...prev,
      googleFonts: fonts,
    }));
  };

  const getDeviceWidth = (device: string) => {
    switch (device) {
      case 'mobile':
        return '375px';
      case 'tablet':
        return '768px';
      default:
        return '100%';
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return newTheme.name.trim().length > 0;
      case 1:
        return true; // Colors always valid
      case 2:
        return true; // Typography always valid
      case 3:
        return true; // Preview always valid
      default:
        return false;
    }
  };

  const handleCreateTheme = async () => {
    if (!isStepValid(activeStep)) return;

    setIsCreating(true);
    try {
      const themeToCreate = {
        ...newTheme,
        id: '',
        previewImage: null,
        tags: null,
        isActive: false,
        createdById: '',
        updatedById: '',
        createdBy: {} as CreatedBy,
        updatedBy: {} as CreatedBy,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        googleFonts: newTheme.googleFonts.length > 0 ? newTheme.googleFonts : null,
      };
      await createTheme(themeToCreate);
      
      // Navigate to themes list
      navigate(ROUTES.THEMES);
    } catch (error) {
      console.error('Error creating theme:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const renderColorPicker = (
    colorType: 'primary' | 'secondary',
    label: string,
    value: string
  ) => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        {label}
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: 1, mb: 2 }}>
        {predefinedColors.map((color) => (
          <Tooltip key={color.name} title={color.name}>
            <Box
              sx={{
                width: 60,
                height: 60,
                backgroundColor: color.value,
                borderRadius: '8px',
                cursor: 'pointer',
                border: value === color.value ? '3px solid #1E90FF' : '1px solid rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                },
              }}
              onClick={() => handleColorChange(colorType, color.value)}
            />
          </Tooltip>
        ))}
      </Box>
      <MuiColorInput
        label="Custom Color"
        value={value}
        format="hex"
        onChange={(color) => handleColorChange(colorType, color)}
        sx={{ mt: 2 }}
        fullWidth
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
        <Chip
          label={label}
          sx={{ bgcolor: value, color: 'white' }}
        />
        <Typography variant="body2" color="text.secondary">
          {value}
        </Typography>
      </Box>
    </Box>
  );

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <InfoIcon sx={{ fontSize: 48, color: '#1E90FF', mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Basic Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Let's start with the basics. Give your theme a name and description.
              </Typography>
            </Box>
            
            <TextField
              label="Theme Name"
              value={newTheme.name}
              onChange={(e) => setNewTheme(prev => ({ ...prev, name: e.target.value }))}
              fullWidth
              variant="outlined"
              required
              error={!newTheme.name.trim() && activeStep > 0}
              helperText={!newTheme.name.trim() && activeStep > 0 ? 'Theme name is required' : ''}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#F8F9FA',
                  borderRadius: '8px',
                },
              }}
            />
            
            <TextField
              label="Description"
              value={newTheme.description}
              onChange={(e) => setNewTheme(prev => ({ ...prev, description: e.target.value }))}
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              helperText="Optional: Describe your theme's purpose and style"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#F8F9FA',
                  borderRadius: '8px',
                },
              }}
            />
            
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Theme Mode
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant={newTheme.themeConfig.palette.mode === 'light' ? 'contained' : 'outlined'}
                  onClick={() => handleModeChange('light')}
                  startIcon={<LightbulbIcon />}
                  sx={{ flex: 1, p: 2 }}
                >
                  Light Mode
                </Button>
                <Button
                  variant={newTheme.themeConfig.palette.mode === 'dark' ? 'contained' : 'outlined'}
                  onClick={() => handleModeChange('dark')}
                  startIcon={<DarkModeIcon />}
                  sx={{ flex: 1, p: 2 }}
                >
                  Dark Mode
                </Button>
              </Box>
            </Box>
          </Box>
        );
        
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <ColorLensIcon sx={{ fontSize: 48, color: '#1E90FF', mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Choose Colors
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Select your theme's color palette. You can choose from presets or use custom colors.
              </Typography>
            </Box>
            
            {renderColorPicker('primary', 'Primary Color', newTheme.themeConfig.palette.primary.main)}
            {renderColorPicker('secondary', 'Secondary Color', newTheme.themeConfig.palette.secondary.main)}
          </Box>
        );
        
      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <TextFieldsIcon sx={{ fontSize: 48, color: '#1E90FF', mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Typography
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Customize fonts and typography styles for your theme.
              </Typography>
            </Box>
            
            <TypographyEditor
              typography={newTheme.themeConfig.typography}
              onChange={handleTypographyChange}
              googleFonts={newTheme.googleFonts}
              onGoogleFontsChange={handleGoogleFontsChange}
            />
          </Box>
        );
        
      case 3:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <CheckCircleIcon sx={{ fontSize: 48, color: '#4CAF50', mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Preview & Confirmation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Review your theme configuration and create it.
              </Typography>
            </Box>
            
            <Card sx={{ p: 3, bgcolor: '#F8F9FA' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Theme Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">Name</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>{newTheme.name}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">Mode</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>{newTheme.themeConfig.palette.mode}</Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="body2" color="text.secondary">Description</Typography>
                  <Typography variant="body1">{newTheme.description || 'No description'}</Typography>
                </Grid>
              </Grid>
              
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    bgcolor: newTheme.themeConfig.palette.primary.main,
                    borderRadius: '4px'
                  }} />
                  <Typography variant="body2">Primary</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    bgcolor: newTheme.themeConfig.palette.secondary.main,
                    borderRadius: '4px'
                  }} />
                  <Typography variant="body2">Secondary</Typography>
                </Box>
              </Box>
            </Card>
            
            <Alert severity="success">
              <Typography variant="body2">
                Your theme is ready to be created! Click "Create Theme" to save it.
              </Typography>
            </Alert>
          </Box>
        );
        
      default:
        return null;
    }
  };

  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link 
          component={RouterLink} 
          to={ROUTES.THEMES} 
          color="inherit" 
          underline="hover"
        >
          Themes
        </Link>
        <Typography color="text.primary">Create Theme</Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h1" sx={{ fontSize: '2.5rem', fontWeight: 700, color: '#333333', mb: 2 }}>
          Create New Theme
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Build your custom theme with our step-by-step wizard
        </Typography>
      </Box>

      {/* Progress Bar */}
      <Box sx={{ mb: 4 }}>
        <LinearProgress 
          variant="determinate" 
          value={(activeStep + 1) / steps.length * 100} 
          sx={{ 
            height: 8, 
            borderRadius: 4,
            backgroundColor: '#E0E0E0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#1E90FF',
              borderRadius: 4,
            },
          }} 
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
          Step {activeStep + 1} of {steps.length}
        </Typography>
      </Box>

      {/* Stepper */}
      <Card sx={{ mb: 4, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
        <CardContent sx={{ p: 4 }}>
          <Stepper 
            activeStep={activeStep} 
            alternativeLabel
            sx={{ 
              mb: 0,
              '& .MuiStepLabel-label': {
                fontSize: '0.875rem',
                fontWeight: 500,
                '&.Mui-active': {
                  color: '#1E90FF',
                  fontWeight: 600,
                },
                '&.Mui-completed': {
                  color: '#4CAF50',
                },
              },
            }}
          >
            {steps.map((step, index) => (
              <Step key={step.label} completed={index < activeStep}>
                <StepLabel
                  StepIconComponent={({ active, completed }) => (
                    <Box sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: completed ? '#4CAF50' : active ? '#1E90FF' : '#E0E0E0',
                      color: completed || active ? 'white' : '#757575',
                      transition: 'all 0.3s ease',
                    }}>
                      {completed ? (
                        <CheckCircleIcon sx={{ fontSize: 20 }} />
                      ) : (
                        <step.icon sx={{ fontSize: 20 }} />
                      )}
                    </Box>
                  )}
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Grid container spacing={4}>
        {/* Form Panel */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', minHeight: '600px' }}>
            <CardContent sx={{ p: 4 }}>
              <Fade in key={activeStep} timeout={300}>
                <Box>
                  {getStepContent(activeStep)}
                </Box>
              </Fade>
            </CardContent>
            
            <Divider />
            
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  sx={{ 
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 500,
                  }}
                >
                  Back
                </Button>
                
                <Typography variant="body2" color="text.secondary">
                  Step {activeStep + 1} of {steps.length}
                </Typography>
                
                {activeStep === steps.length - 1 ? (
                  <Button
                    onClick={handleCreateTheme}
                    variant="contained"
                    size="large"
                    startIcon={isCreating ? <CircularProgress size={16} /> : <SaveIcon />}
                    disabled={!isStepValid(activeStep) || isCreating}
                    sx={{
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 500,
                      boxShadow: 'none',
                      '&:hover': {
                        boxShadow: '0 2px 8px rgba(30, 144, 255, 0.3)',
                      },
                    }}
                  >
                    {isCreating ? 'Creating...' : 'Create Theme'}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    disabled={!isStepValid(activeStep)}
                    sx={{
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 500,
                      boxShadow: 'none',
                      '&:hover': {
                        boxShadow: '0 2px 8px rgba(30, 144, 255, 0.3)',
                      },
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Preview Panel */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card sx={{ 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            position: 'sticky',
            top: 24,
            maxHeight: 'calc(100vh - 160px)',
            overflow: 'auto',
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Live Preview
                </Typography>
                <ToggleButtonGroup
                  value={previewDevice}
                  exclusive
                  onChange={handleDeviceChange}
                  size="small"
                  sx={{ '& .MuiToggleButton-root': { px: 1 } }}
                >
                  <ToggleButton value="desktop" aria-label="desktop">
                    <ComputerIcon fontSize="small" />
                  </ToggleButton>
                  <ToggleButton value="tablet" aria-label="tablet">
                    <TabletIcon fontSize="small" />
                  </ToggleButton>
                  <ToggleButton value="mobile" aria-label="mobile">
                    <SmartphoneIcon fontSize="small" />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <Paper 
                variant="outlined" 
                sx={{ 
                  borderRadius: '8px',
                  p: 2,
                  backgroundColor: '#F8F9FA',
                  minHeight: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ 
                  width: getDeviceWidth(previewDevice),
                  maxWidth: '100%',
                  transition: 'all 0.3s ease-in-out',
                }}>
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
                    googleFonts: newTheme.googleFonts.length > 0 ? newTheme.googleFonts : null,
                  }}>
                    <DemoComponents />
                  </ThemeProvider>
                </Box>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ThemeCreate;