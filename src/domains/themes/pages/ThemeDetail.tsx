import React from 'react';
import { Typography, Box, Card, CardContent, Button, Chip } from '@mui/material';
import { useParams } from 'react-router';

const ThemeDetail: React.FC = () => {
  const { id } = useParams();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Theme Details
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined">
            Edit
          </Button>
          <Button variant="contained">
            Use Theme
          </Button>
        </Box>
      </Box>
      
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Theme {id}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            This is a detailed view of theme {id}. Here you can see all the theme properties and preview how it looks.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip label="Material-UI" size="small" />
            <Chip label="Dark Mode" size="small" />
            <Chip label="Custom" size="small" />
          </Box>
          
          <Typography variant="h6" gutterBottom>
            Color Palette
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Box sx={{ width: 50, height: 50, bgcolor: 'primary.main', borderRadius: 1 }} />
            <Box sx={{ width: 50, height: 50, bgcolor: 'secondary.main', borderRadius: 1 }} />
            <Box sx={{ width: 50, height: 50, bgcolor: 'error.main', borderRadius: 1 }} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ThemeDetail;