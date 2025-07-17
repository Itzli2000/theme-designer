import { ROUTES } from "@app/router/constants";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  Container,
  Grid,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
  Divider,
  Stack,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Breadcrumbs,
  Link,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  PlayArrow as PlayArrowIcon,
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
  Computer as ComputerIcon,
  Palette as PaletteIcon,
  TextFields as TextFieldsIcon,
  ViewModule as ViewModuleIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { ThemeProvider } from "@shared/components";
import { Link as RouterLink, useParams } from "react-router";
import { useThemesStore } from "../store";
import { useMemo, useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`theme-tabpanel-${index}`}
      aria-labelledby={`theme-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const ThemeDetail = () => {
  const { id } = useParams();
  const { themes, isLoading } = useThemesStore();
  const [tabValue, setTabValue] = useState(0);
  const [previewDevice, setPreviewDevice] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");

  const selectedTheme = useMemo(() => {
    return themes?.find((theme) => theme.id === id);
  }, [themes, id]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDeviceChange = (
    _event: React.MouseEvent<HTMLElement>,
    newDevice: "desktop" | "tablet" | "mobile"
  ) => {
    if (newDevice !== null) {
      setPreviewDevice(newDevice);
    }
  };

  const getDeviceWidth = (device: string) => {
    switch (device) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      default:
        return "100%";
    }
  };

  const renderColorPalette = () => {
    const palette = selectedTheme?.themeConfig.palette;
    if (!palette) return null;

    return (
      <Stack spacing={3}>
        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Primary Colors
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: palette.primary.main,
                  borderRadius: 2,
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  mb: 1,
                }}
              />
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                Primary
              </Typography>
              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
              >
                {palette.primary.main}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: palette.secondary.main,
                  borderRadius: 2,
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  mb: 1,
                }}
              />
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                Secondary
              </Typography>
              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
              >
                {palette.secondary.main}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Stack>
    );
  };

  const renderThemeInfo = () => {
    if (!selectedTheme) return null;

    return (
      <Stack spacing={3}>
        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Theme Information
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Name
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {selectedTheme.name}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Status
              </Typography>
              <Chip
                label={selectedTheme.isActive ? "Active" : "Draft"}
                size="small"
                color={selectedTheme.isActive ? "success" : "default"}
                sx={{ mt: 0.5 }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" color="text.secondary">
                Description
              </Typography>
              <Typography variant="body1">
                {selectedTheme.description || "No description provided"}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Created By
              </Typography>
              <Typography variant="body1">
                {selectedTheme.createdBy.firstName}{" "}
                {selectedTheme.createdBy.lastName}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body2" color="text.secondary">
                Created At
              </Typography>
              <Typography variant="body1">
                {new Date(selectedTheme.createdAt).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Theme Configuration
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Mode: {selectedTheme.themeConfig.palette.mode}
          </Typography>
          {selectedTheme.tags && selectedTheme.tags.length > 0 && (
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {selectedTheme.tags.map((tag, index) => (
                <Chip key={index} label={tag} size="small" variant="outlined" />
              ))}
            </Box>
          )}
        </Box>
      </Stack>
    );
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!selectedTheme) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Theme not found
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          component={RouterLink}
          to={ROUTES.THEMES}
          sx={{ textTransform: "none" }}
        >
          Back to Themes
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          component={RouterLink}
          to={ROUTES.THEMES}
          color="inherit"
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
        >
          Themes
        </Link>
        <Typography color="text.primary">{selectedTheme.name}</Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          pb: 3,
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "#333333",
              mb: 1,
            }}
          >
            {selectedTheme.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {selectedTheme.description || "Theme details and preview"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            component={RouterLink}
            to={`${ROUTES.THEMES}/${selectedTheme.id}/edit`}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Edit Theme
          </Button>
          <Button
            variant="contained"
            startIcon={<PlayArrowIcon />}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 500,
              boxShadow: "none",
              "&:hover": {
                boxShadow: "0 2px 8px rgba(30, 144, 255, 0.3)",
              },
            }}
          >
            Use Theme
          </Button>
        </Box>
      </Box>

      {/* Main Content Layout */}
      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid size={12}>
          <Card
            sx={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box sx={{ borderBottom: "1px solid #E0E0E0" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                sx={{ px: 3, pt: 2 }}
              >
                <Tab
                  icon={<InfoIcon />}
                  label="General"
                  iconPosition="start"
                  sx={{ textTransform: "none", fontWeight: 500 }}
                />
                <Tab
                  icon={<PaletteIcon />}
                  label="Colors"
                  iconPosition="start"
                  sx={{ textTransform: "none", fontWeight: 500 }}
                />
                <Tab
                  icon={<TextFieldsIcon />}
                  label="Typography"
                  iconPosition="start"
                  sx={{ textTransform: "none", fontWeight: 500 }}
                />
                <Tab
                  icon={<ViewModuleIcon />}
                  label="Components"
                  iconPosition="start"
                  sx={{ textTransform: "none", fontWeight: 500 }}
                />
              </Tabs>
            </Box>

            <CardContent sx={{ p: 4 }}>
              <TabPanel value={tabValue} index={0}>
                {renderThemeInfo()}
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                {renderColorPalette()}
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom>
                  Typography Samples
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Typography samples will be displayed here.
                </Typography>
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                <Typography variant="h6" gutterBottom>
                  Component Preview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Component previews will be displayed here.
                </Typography>
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>

        {/* Preview Sidebar */}
        <Grid size={12}>
          <Card
            sx={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              position: "sticky",
              top: 24,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Live Preview
                </Typography>
                <ToggleButtonGroup
                  value={previewDevice}
                  exclusive
                  onChange={handleDeviceChange}
                  size="small"
                  sx={{ "& .MuiToggleButton-root": { px: 1 } }}
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
                  borderRadius: "8px",
                  p: 2,
                  backgroundColor: "#F8F9FA",
                  minHeight: "400px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: getDeviceWidth(previewDevice),
                    maxWidth: "100%",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <ThemeProvider selectedTheme={selectedTheme} />
                </Box>
              </Paper>

              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  Quick Actions
                </Typography>
                <Stack spacing={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditIcon />}
                    component={RouterLink}
                    to={`${ROUTES.THEMES}/${selectedTheme.id}/edit`}
                    sx={{
                      textTransform: "none",
                      justifyContent: "flex-start",
                    }}
                  >
                    Edit Theme
                  </Button>
                  <Button
                    variant="text"
                    size="small"
                    startIcon={<ArrowBackIcon />}
                    component={RouterLink}
                    to={ROUTES.THEMES}
                    sx={{
                      textTransform: "none",
                      justifyContent: "flex-start",
                    }}
                  >
                    Back to Themes
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ThemeDetail;
