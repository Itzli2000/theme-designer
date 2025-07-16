import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDashboardStore } from "../store";

const Dashboard = () => {
  const { themes, pagination, isLoading, error, fetchThemes } =
    useDashboardStore();

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

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Welcome to Theme Designer</Typography>
          <Typography variant="body2" color="text.secondary">
            Start creating and managing your MUI themes here.
          </Typography>
          {pagination && (
            <Typography variant="body2" color="text.secondary">
              {pagination.total} themes found
              {JSON.stringify(pagination, null, 2)}
            </Typography>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Themes</Typography>
          <Box>
            {themes?.map((theme) => (
              <Typography key={theme.id}>{theme.name}</Typography>
            ))}
            {themes?.length === 0 && (
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
