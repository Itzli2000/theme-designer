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
} from "@mui/material";
import { ThemeProvider } from "@shared/components";
import { useState, useEffect } from "react";
import { useThemesStore } from "../store";
import type { Theme } from "../store/types";

const ThemeEdit = () => {
  const { selectedTheme, updateTheme } = useThemesStore();

  // Estado local para edición en tiempo real
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);

  // Inicializar el estado con el tema seleccionado
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

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Edit Theme: {editingTheme.name}
      </Typography>

      <Grid container spacing={3}>
        {/* Panel de edición */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Theme Configuration
              </Typography>
              <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
              >
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

                <TextField
                  label="Primary Color"
                  type="color"
                  value={editingTheme.themeConfig.palette.primary.main}
                  onChange={(e) => handleColorChange("primary", e.target.value)}
                  fullWidth
                  variant="outlined"
                />

                <TextField
                  label="Secondary Color"
                  type="color"
                  value={editingTheme.themeConfig.palette.secondary.main}
                  onChange={(e) =>
                    handleColorChange("secondary", e.target.value)
                  }
                  fullWidth
                  variant="outlined"
                />

                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => updateTheme(editingTheme.id, editingTheme)}
                  >
                    Save Changes
                  </Button>
                  <Button variant="outlined" size="large">
                    Cancel
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Vista previa en tiempo real */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Live Preview
              </Typography>
              <Box
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                <ThemeProvider selectedTheme={editingTheme}>
                  {/* DemoComponents are rendered inside ThemeProvider */}
                </ThemeProvider>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ThemeEdit;
