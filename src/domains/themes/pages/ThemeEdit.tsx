import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  Tabs,
  Tab,
  Chip,
  Stack,
  Divider,
  IconButton,
  Tooltip,
  Alert,
  Container,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Breadcrumbs,
  Link,
  Fade,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Upload as UploadIcon,
  Refresh as RefreshIcon,
  Save as SaveIcon,
  Settings as SettingsIcon,
  Palette as PaletteIcon,
  TextFields as TextFieldsIcon,
  Widgets as WidgetsIcon,
  Computer as ComputerIcon,
  Tablet as TabletIcon,
  Smartphone as SmartphoneIcon,
  Lightbulb as LightbulbIcon,
  DarkMode as DarkModeIcon,
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { ThemeProvider, DemoComponents } from "@shared/components";
import { useState, useEffect, useMemo } from "react";
import { useThemesStore } from "../store";
import { ROUTES } from "@app/router/constants";
import { Link as RouterLink, useParams, useNavigate } from "react-router";
import type { Theme } from "../store/types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`theme-tabpanel-${index}`}
    aria-labelledby={`theme-tab-${index}`}
  >
    {value === index && <Box sx={{ py: 0 }}>{children}</Box>}
  </div>
);

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

const ThemeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { themes, updateTheme, isLoading } = useThemesStore();
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const selectedTheme = useMemo(() => {
    return themes?.find(theme => theme.id === id);
  }, [themes, id]);

  useEffect(() => {
    if (selectedTheme) {
      setEditingTheme(selectedTheme);
    }
  }, [selectedTheme]);

  useEffect(() => {
    if (selectedTheme && editingTheme) {
      const hasChanges = JSON.stringify(selectedTheme) !== JSON.stringify(editingTheme);
      setHasUnsavedChanges(hasChanges);
    }
  }, [selectedTheme, editingTheme]);

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!selectedTheme || !editingTheme) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Theme not found
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          component={RouterLink}
          to={ROUTES.THEMES}
          sx={{ textTransform: 'none' }}
        >
          Back to Themes
        </Button>
      </Container>
    );
  }

  const handleColorChange = (
    colorType: "primary" | "secondary",
    value: string
  ) => {
    setEditingTheme((prev) => {
      if (!prev) return null;
      return {
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
      };
    });
  };

  const handleModeChange = (mode: "light" | "dark") => {
    setEditingTheme((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        themeConfig: {
          ...prev.themeConfig,
          palette: {
            ...prev.themeConfig.palette,
            mode,
          },
        },
      };
    });
  };

  const handleDeviceChange = (_event: React.MouseEvent<HTMLElement>, newDevice: 'desktop' | 'tablet' | 'mobile') => {
    if (newDevice !== null) {
      setPreviewDevice(newDevice);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateTheme(editingTheme.id, editingTheme);
      setShowSaveSuccess(true);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error saving theme:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportTheme = () => {
    const themeData = JSON.stringify(editingTheme.themeConfig, null, 2);
    const blob = new Blob([themeData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${editingTheme.name.replace(/\s+/g, '_')}_theme.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedTheme = JSON.parse(e.target?.result as string);
          setEditingTheme(prev => prev ? { ...prev, themeConfig: importedTheme } : null);
        } catch {
          console.error('Invalid theme file');
        }
      };
      reader.readAsText(file);
    }
  };

  const resetTheme = () => {
    if (selectedTheme) {
      setEditingTheme(selectedTheme);
    }
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

  const renderColorPicker = (
    colorType: 'primary' | 'secondary',
    label: string,
    value: string
  ) => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
        {label}
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))', gap: 1, mb: 2 }}>
        {predefinedColors.map((color) => (
          <Tooltip key={color.name} title={color.name}>
            <Box
              sx={{
                width: 50,
                height: 50,
                backgroundColor: color.value,
                borderRadius: '8px',
                cursor: 'pointer',
                border: value === color.value ? '3px solid #1E90FF' : '1px solid rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                },
              }}
              onClick={() => handleColorChange(colorType, color.value)}
            />
          </Tooltip>
        ))}
      </Box>
      <TextField
        label="Custom Color"
        type="color"
        value={value}
        onChange={(e) => handleColorChange(colorType, e.target.value)}
        sx={{ 
          mt: 2,
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#F8F9FA',
            borderRadius: '8px',
          },
        }}
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
        <Link 
          component={RouterLink} 
          to={`${ROUTES.THEMES}/${editingTheme.id}`} 
          color="inherit" 
          underline="hover"
        >
          {editingTheme.name}
        </Link>
        <Typography color="text.primary">Edit</Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4,
        pb: 3,
        borderBottom: '1px solid #E0E0E0'
      }}>
        <Box>
          <Typography variant="h1" sx={{ fontSize: '2.5rem', fontWeight: 700, color: '#333333', mb: 1 }}>
            Edit Theme
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {editingTheme.name}
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Tooltip title="Export Theme">
            <IconButton onClick={handleExportTheme} color="primary">
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Import Theme">
            <IconButton component="label" color="primary">
              <UploadIcon />
              <input
                type="file"
                accept=".json"
                onChange={handleImportTheme}
                style={{ display: 'none' }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset Changes">
            <IconButton onClick={resetTheme} color="primary" disabled={!hasUnsavedChanges}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      {/* Main Content */}
      <Grid container spacing={4}>
        {/* Form Panel */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <Box sx={{ borderBottom: '1px solid #E0E0E0' }}>
              <Tabs
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                value={tabValue}
                onChange={(_event, newValue) => setTabValue(newValue)}
                sx={{ px: 3, pt: 2 }}
              >
                <Tab 
                  icon={<SettingsIcon />} 
                  label="General" 
                  iconPosition="start"
                  sx={{ textTransform: 'none', fontWeight: 500 }}
                />
                <Tab 
                  icon={<PaletteIcon />} 
                  label="Colors" 
                  iconPosition="start"
                  sx={{ textTransform: 'none', fontWeight: 500 }}
                />
                <Tab 
                  icon={<TextFieldsIcon />} 
                  label="Typography" 
                  iconPosition="start"
                  sx={{ textTransform: 'none', fontWeight: 500 }}
                />
                <Tab 
                  icon={<WidgetsIcon />} 
                  label="Components" 
                  iconPosition="start"
                  sx={{ textTransform: 'none', fontWeight: 500 }}
                />
              </Tabs>
            </Box>

            <CardContent sx={{ p: 4 }}>
              <Fade in key={tabValue} timeout={300}>
                <Box>
                  <TabPanel value={tabValue} index={0}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Basic Information
                      </Typography>
                      
                      <TextField
                        label="Theme Name"
                        value={editingTheme.name}
                        onChange={(e) =>
                          setEditingTheme((prev) =>
                            prev ? { ...prev, name: e.target.value } : null
                          )
                        }
                        fullWidth
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#F8F9FA',
                            borderRadius: '8px',
                          },
                        }}
                      />

                      <TextField
                        label="Description"
                        value={editingTheme.description || ''}
                        onChange={(e) =>
                          setEditingTheme((prev) =>
                            prev ? { ...prev, description: e.target.value || null } : null
                          )
                        }
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        helperText="Describe your theme's purpose and style"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#F8F9FA',
                            borderRadius: '8px',
                          },
                        }}
                      />

                      <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                          Theme Mode
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Button
                            variant={editingTheme.themeConfig.palette.mode === 'light' ? 'contained' : 'outlined'}
                            onClick={() => handleModeChange('light')}
                            startIcon={<LightbulbIcon />}
                            sx={{ flex: 1, p: 2 }}
                          >
                            Light Mode
                          </Button>
                          <Button
                            variant={editingTheme.themeConfig.palette.mode === 'dark' ? 'contained' : 'outlined'}
                            onClick={() => handleModeChange('dark')}
                            startIcon={<DarkModeIcon />}
                            sx={{ flex: 1, p: 2 }}
                          >
                            Dark Mode
                          </Button>
                        </Box>
                      </Box>

                      <Box sx={{ p: 3, bgcolor: '#F8F9FA', borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                          Theme Information
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid size={{ xs: 6 }}>
                            <Typography variant="body2" color="text.secondary">Created By</Typography>
                            <Typography variant="body1">{editingTheme.createdBy.firstName} {editingTheme.createdBy.lastName}</Typography>
                          </Grid>
                          <Grid size={{ xs: 6 }}>
                            <Typography variant="body2" color="text.secondary">Created</Typography>
                            <Typography variant="body1">{new Date(editingTheme.createdAt).toLocaleDateString()}</Typography>
                          </Grid>
                          <Grid size={{ xs: 6 }}>
                            <Typography variant="body2" color="text.secondary">Status</Typography>
                            <Chip 
                              label={editingTheme.isActive ? 'Active' : 'Draft'} 
                              size="small" 
                              color={editingTheme.isActive ? 'success' : 'default'}
                            />
                          </Grid>
                          <Grid size={{ xs: 6 }}>
                            <Typography variant="body2" color="text.secondary">Last Updated</Typography>
                            <Typography variant="body1">{new Date(editingTheme.updatedAt).toLocaleDateString()}</Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </TabPanel>

                  <TabPanel value={tabValue} index={1}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Color Palette
                      </Typography>
                      
                      {renderColorPicker('primary', 'Primary Color', editingTheme.themeConfig.palette.primary.main)}
                      {renderColorPicker('secondary', 'Secondary Color', editingTheme.themeConfig.palette.secondary.main)}
                      
                      <Box sx={{ p: 3, bgcolor: '#F8F9FA', borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                          Color Preview
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ 
                              width: 40, 
                              height: 40, 
                              bgcolor: editingTheme.themeConfig.palette.primary.main,
                              borderRadius: '8px',
                              border: '1px solid rgba(0,0,0,0.1)'
                            }} />
                            <Typography variant="body2">Primary</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ 
                              width: 40, 
                              height: 40, 
                              bgcolor: editingTheme.themeConfig.palette.secondary.main,
                              borderRadius: '8px',
                              border: '1px solid rgba(0,0,0,0.1)'
                            }} />
                            <Typography variant="body2">Secondary</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </TabPanel>

                  <TabPanel value={tabValue} index={2}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Typography Settings
                      </Typography>
                      
                      <Alert severity="info" sx={{ mb: 3 }}>
                        <Typography variant="body2">
                          Typography customization will be available in the next update. Advanced font settings are coming soon!
                        </Typography>
                      </Alert>
                      
                      <Box sx={{ p: 4, bgcolor: '#F8F9FA', borderRadius: 2, textAlign: 'center' }}>
                        <Typography variant="h4" gutterBottom>
                          Sample Heading
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          Subtitle Text
                        </Typography>
                        <Typography variant="body1" paragraph>
                          This is a sample paragraph showing how your theme's typography will look with the current settings.
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Secondary text in smaller size for additional context.
                        </Typography>
                      </Box>
                    </Box>
                  </TabPanel>

                  <TabPanel value={tabValue} index={3}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Component Styles
                      </Typography>
                      
                      <Alert severity="info" sx={{ mb: 3 }}>
                        <Typography variant="body2">
                          Component-level customization will be available in the next update. Advanced styling options are coming soon!
                        </Typography>
                      </Alert>
                      
                      <Box sx={{ p: 4, bgcolor: '#F8F9FA', borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          Component Preview
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                          Button styles, input variants, and component overrides will be available here.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                          <Button variant="contained" size="small">Primary Button</Button>
                          <Button variant="outlined" size="small">Secondary Button</Button>
                          <Button variant="text" size="small">Text Button</Button>
                        </Box>
                      </Box>
                    </Box>
                  </TabPanel>
                </Box>
              </Fade>
            </CardContent>
            
            <Divider />
            
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(ROUTES.THEMES)}
                  startIcon={<ArrowBackIcon />}
                  sx={{ 
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 500,
                  }}
                >
                  Back to Themes
                </Button>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    variant="outlined" 
                    onClick={resetTheme}
                    disabled={!hasUnsavedChanges}
                    sx={{ 
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 500,
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    startIcon={isSaving ? <CircularProgress size={16} /> : <SaveIcon />}
                    disabled={isSaving}
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
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
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
                  <ThemeProvider selectedTheme={editingTheme}>
                    <DemoComponents />
                  </ThemeProvider>
                </Box>
              </Paper>

              {hasUnsavedChanges && (
                <Alert severity="warning" sx={{ mt: 3 }}>
                  <Typography variant="body2">
                    You have unsaved changes. Don't forget to save!
                  </Typography>
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Success Snackbar */}
      <Snackbar
        open={showSaveSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSaveSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowSaveSuccess(false)} 
          severity="success" 
          sx={{ width: '100%' }}
          icon={<CheckCircleIcon />}
        >
          Theme saved successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ThemeEdit;
