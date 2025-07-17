import { ROUTES } from '@app/router/constants';
import { Box, Button, Card, CardContent, Chip, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { useThemesStore } from '../store';

const ThemeDetail = () => {
  const { selectedTheme } = useThemesStore();

  if (!selectedTheme) return <div>Theme not found</div>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Theme Details
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            component={RouterLink}
            to={`${ROUTES.THEMES}/${selectedTheme.id}/edit`}
          >
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
            Theme {selectedTheme.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            This is a detailed view of theme {selectedTheme.name}. Here you can see all the theme properties and preview how it looks.
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
            <Box sx={{ width: 50, height: 50, bgcolor: selectedTheme.themeConfig.palette.primary.main, borderRadius: 1 }} />
            <Box sx={{ width: 50, height: 50, bgcolor: selectedTheme.themeConfig.palette.secondary.main, borderRadius: 1 }} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ThemeDetail;