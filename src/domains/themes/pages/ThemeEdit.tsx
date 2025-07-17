import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Stack,
  Divider,
  IconButton,
  Tooltip,
  Alert,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Refresh as RefreshIcon,
  Palette as PaletteIcon,
  TextFields as TextFieldsIcon,
  Widgets as WidgetsIcon,
} from "@mui/icons-material";
import { ThemeProvider, DemoComponents } from "@shared/components";
import { useState, useEffect } from "react";
import { useThemesStore } from "../store";
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
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const ThemeEdit = () => {
  const { selectedTheme, updateTheme } = useThemesStore();
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    if (selectedTheme) {
      setEditingTheme(selectedTheme);
    }
  }, [selectedTheme]);

  if (!selectedTheme || !editingTheme) return <div>Theme not found</div>;

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
        } catch (error) {
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

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Edit Theme: {editingTheme.name}
        </Typography>
        <Stack direction="row" spacing={1}>
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
          <Tooltip title="Reset Theme">
            <IconButton onClick={resetTheme} color="primary">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ height: 'fit-content' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PaletteIcon />
                Theme Configuration
              </Typography>
              
              <Tabs
                value={tabValue}
                onChange={(_, newValue) => setTabValue(newValue)}
                sx={{ mb: 2 }}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="General" />
                <Tab label="Colors" />
                <Tab label="Typography" />
                <Tab label="Components" />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
                    rows={3}
                    variant="outlined"
                  />

                  <FormControl fullWidth>
                    <InputLabel>Theme Mode</InputLabel>
                    <Select
                      value={editingTheme.themeConfig.palette.mode}
                      label="Theme Mode"
                      onChange={(e) =>
                        handleModeChange(e.target.value as "light" | "dark")
                      }
                    >
                      <MenuItem value="light">Light</MenuItem>
                      <MenuItem value="dark">Dark</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1">Primary Colors</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField
                          label="Primary Color"
                          type="color"
                          value={editingTheme.themeConfig.palette.primary.main}
                          onChange={(e) => handleColorChange("primary", e.target.value)}
                          fullWidth
                          variant="outlined"
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            label="Primary"
                            sx={{ bgcolor: editingTheme.themeConfig.palette.primary.main, color: 'white' }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {editingTheme.themeConfig.palette.primary.main}
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
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField
                          label="Secondary Color"
                          type="color"
                          value={editingTheme.themeConfig.palette.secondary.main}
                          onChange={(e) => handleColorChange("secondary", e.target.value)}
                          fullWidth
                          variant="outlined"
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            label="Secondary"
                            sx={{ bgcolor: editingTheme.themeConfig.palette.secondary.main, color: 'white' }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {editingTheme.themeConfig.palette.secondary.main}
                          </Typography>
                        </Box>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      Typography customization will be available in the next update.
                    </Typography>
                  </Alert>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.6 }}>
                    <TextFieldsIcon />
                    <Typography variant="h6">Typography Settings</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Font family, sizes, and weights customization coming soon.
                  </Typography>
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={3}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      Component-level customization will be available in the next update.
                    </Typography>
                  </Alert>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.6 }}>
                    <WidgetsIcon />
                    <Typography variant="h6">Component Styles</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Button styles, input variants, and component overrides coming soon.
                  </Typography>
                </Box>
              </TabPanel>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => updateTheme(editingTheme.id, editingTheme)}
                  fullWidth
                >
                  Save Changes
                </Button>
                <Button variant="outlined" size="large" onClick={resetTheme}>
                  Reset
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Live Preview
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant={previewMode === 'desktop' ? 'contained' : 'outlined'}
                    onClick={() => setPreviewMode('desktop')}
                  >
                    Desktop
                  </Button>
                  <Button
                    size="small"
                    variant={previewMode === 'tablet' ? 'contained' : 'outlined'}
                    onClick={() => setPreviewMode('tablet')}
                  >
                    Tablet
                  </Button>
                  <Button
                    size="small"
                    variant={previewMode === 'mobile' ? 'contained' : 'outlined'}
                    onClick={() => setPreviewMode('mobile')}
                  >
                    Mobile
                  </Button>
                </Box>
              </Box>
              
              <Box
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  overflow: "hidden",
                  display: 'flex',
                  justifyContent: 'center',
                  bgcolor: 'grey.50',
                  minHeight: '600px',
                }}
              >
                <Box
                  sx={{
                    width: getPreviewWidth(),
                    maxWidth: '100%',
                    bgcolor: 'background.default',
                    transition: 'width 0.3s ease',
                  }}
                >
                  <ThemeProvider selectedTheme={editingTheme}>
                    <DemoComponents />
                  </ThemeProvider>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ThemeEdit;
