import { ROUTES } from "@app/router/constants";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
  Alert,
  Container,
  InputAdornment,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
import { 
  Add as AddIcon, 
  Search as SearchIcon, 
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import { useThemesStore } from "../store";
import type { Theme } from "../store/types";

const ThemesList = () => {
  const { themes, isLoading, error, fetchThemes, setSelectedTheme, deleteTheme } =
    useThemesStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);

  useEffect(() => {
    fetchThemes();
  }, [fetchThemes]);

  const handleViewDetails = (theme: Theme) => {
    setSelectedTheme(theme);
    navigate(`${ROUTES.THEMES}/${theme.id}`);
  };

  const handleEditTheme = (themeId: string) => {
    navigate(`${ROUTES.THEMES}/${themeId}/edit`);
    setAnchorEl(null);
  };

  const handleDeleteTheme = async (themeId: string) => {
    if (window.confirm("Are you sure you want to delete this theme?")) {
      await deleteTheme(themeId);
    }
    setAnchorEl(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, themeId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedThemeId(themeId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedThemeId(null);
  };

  const filteredThemes = themes?.filter(theme =>
    theme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    theme.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "success" : "default";
  };

  const getStatusLabel = (isActive: boolean) => {
    return isActive ? "Active" : "Draft";
  };

  const renderColorPreview = (theme: Theme) => {
    const colors = [
      theme.themeConfig.palette?.primary?.main,
      theme.themeConfig.palette?.secondary?.main,
    ];
    
    return (
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        {colors.map((color, index) => (
          <Box
            key={index}
            sx={{
              width: 32,
              height: 32,
              bgcolor: color,
              borderRadius: "6px",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              flexShrink: 0,
            }}
          />
        ))}
      </Box>
    );
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
        <Typography variant="h1" sx={{ fontSize: "2.5rem", fontWeight: 700, color: "#333333" }}>
          Themes
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            component={RouterLink}
            to={ROUTES.THEMES_CREATE}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 500,
              padding: "10px 20px",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "0 2px 8px rgba(30, 144, 255, 0.3)",
              },
            }}
          >
            Create New Theme
          </Button>
        </Box>
      </Box>

      {/* Search and Filter Toolbar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", flex: 1 }}>
          <TextField
            placeholder="Search themes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{
              minWidth: 300,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#F8F9FA",
                borderRadius: "8px",
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#757575" }} />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              color: "#757575",
              borderColor: "#E0E0E0",
            }}
          >
            Filter
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {filteredThemes?.length || 0} themes found
        </Typography>
      </Box>

      {/* Themes Grid */}
      <Grid container spacing={3}>
        {filteredThemes?.map((theme) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={theme.id}>
            <Fade in timeout={300}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease-in-out",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: "0 4px 16px rgba(30, 144, 255, 0.15)",
                    transform: "translateY(-2px)",
                  },
                  ...(theme.isActive && {
                    border: "2px solid #1E90FF",
                    backgroundColor: "rgba(30, 144, 255, 0.02)",
                  }),
                }}
                onClick={() => handleViewDetails(theme)}
              >
                <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
                  {/* Card Header */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "#333333" }}>
                        {theme.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                        {theme.description || `Sample theme description for ${theme.name}`}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuOpen(e, theme.id);
                      }}
                      sx={{ ml: 1 }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>

                  {/* Color Preview */}
                  {renderColorPreview(theme)}

                  {/* Status and Actions */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: "auto" }}>
                    <Chip
                      label={getStatusLabel(theme.isActive)}
                      size="small"
                      color={getStatusColor(theme.isActive)}
                      sx={{
                        borderRadius: "16px",
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    />
                    <Button
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(theme);
                      }}
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        color: "#1E90FF",
                        "&:hover": {
                          backgroundColor: "rgba(30, 144, 255, 0.1)",
                        },
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredThemes?.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No themes found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {searchTerm ? "Try adjusting your search terms" : "Create your first theme to get started"}
          </Typography>
          {!searchTerm && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              component={RouterLink}
              to={ROUTES.THEMES_CREATE}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 500,
                boxShadow: "none",
              }}
            >
              Create New Theme
            </Button>
          )}
        </Box>
      )}

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            if (selectedThemeId) {
              const theme = themes?.find(t => t.id === selectedThemeId);
              if (theme) {
                handleViewDetails(theme);
              }
            }
          }}
        >
          <VisibilityIcon sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem
          onClick={() => selectedThemeId && handleEditTheme(selectedThemeId)}
        >
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => selectedThemeId && handleDeleteTheme(selectedThemeId)}
          sx={{ color: "error.main" }}
        >
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default ThemesList;
