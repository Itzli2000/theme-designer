import { Typography, Box, Card, CardContent } from "@mui/material";
import { useDashboardStore } from "../store";
import { useEffect } from "react";

const Dashboard = () => {
  const { themes, isLoading, error, fetchThemes } = useDashboardStore();

  useEffect(() => {
    fetchThemes();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6">Welcome to Theme Designer</Typography>
          <Typography variant="body2" color="text.secondary">
            Start creating and managing your MUI themes here.
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6">Themes</Typography>
          <Box>
            {themes.map((theme) => (
              <Typography key={theme.id}>{theme.name}</Typography>
            ))}
            {themes.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                No themes found
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
