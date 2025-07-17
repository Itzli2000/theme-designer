import { ROUTES } from "@app/router/constants";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router";
import { useThemesStore } from "../store";
import type { Theme } from "../store/types";

const ThemesList = () => {
  const { themes, isLoading, error, fetchThemes, setSelectedTheme } =
    useThemesStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchThemes();
  }, [fetchThemes]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  const handleViewDetails = (theme: Theme) => {
    setSelectedTheme(theme);
    navigate(`${ROUTES.THEMES}/${theme.id}`);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Themes</Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to={ROUTES.THEMES_CREATE}
        >
          Create New Theme
        </Button>
      </Box>

      <Grid container spacing={3}>
        {themes?.map((theme) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={theme.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Theme {theme.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sample theme description for theme {theme.name}
                </Typography>
                <Button
                  size="small"
                  sx={{ mt: 2 }}
                  onClick={() => handleViewDetails(theme)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ThemesList;
