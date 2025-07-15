import React from 'react';
import { Typography, Box, Card, CardContent, Grid, Button } from '@mui/material';

const ThemesList = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Themes
        </Typography>
        <Button variant="contained">
          Create New Theme
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((theme) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={theme}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Theme {theme}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sample theme description for theme {theme}
                </Typography>
                <Button size="small" sx={{ mt: 2 }}>
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