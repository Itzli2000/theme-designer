import { ROUTES } from "@app/router/constants";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Alert,
  Container,
  InputAdornment,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import { useThemesStore } from "../store";
import type { Theme } from "../store/types";
import { ThemeCard } from "../components/ui";

const ThemesList = () => {
  const {
    themes,
    isLoading,
    error,
    fetchThemes,
    setSelectedTheme,
    deleteTheme,
  } = useThemesStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchThemes();
  }, [fetchThemes]);

  const handleViewTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    navigate(`${ROUTES.THEMES}/${theme.id}`);
  };

  const handleEditTheme = (theme: Theme) => {
    navigate(`${ROUTES.THEMES}/${theme.id}/edit`);
  };

  const handleDeleteTheme = async (theme: Theme) => {
    if (window.confirm(`Are you sure you want to delete "${theme.name}"?`)) {
      await deleteTheme(theme.id);
    }
  };

  const handleDuplicateTheme = (theme: Theme) => {
    // TODO: Implement duplication logic
    console.log("Duplicate theme:", theme.name);
  };

  const handleExportTheme = (theme: Theme) => {
    // TODO: Implement export logic
    console.log("Export theme:", theme.name);
  };

  const filteredThemes = themes?.filter(
    (theme) =>
      theme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      theme.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Typography
          variant="h1"
          sx={{ fontSize: "2.5rem", fontWeight: 700, color: "#333333" }}
        >
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
            <ThemeCard
              theme={theme}
              onView={handleViewTheme}
              onEdit={handleEditTheme}
              onDelete={handleDeleteTheme}
              onDuplicate={handleDuplicateTheme}
              onExport={handleExportTheme}
              elevation={2}
            />
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
            {searchTerm
              ? "Try adjusting your search terms"
              : "Create your first theme to get started"}
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
    </Container>
  );
};

export default ThemesList;
