import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Alert,
  Paper,
  Avatar,
  Fab,
  Badge,
  LinearProgress,
  Slider,
} from '@mui/material';
import {
  Add as AddIcon,
  Favorite as FavoriteIcon,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

export const DemoComponents = () => {
  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h4" gutterBottom>
        Theme Preview
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Colors & Typography
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="body1">
            Body text with primary and secondary colors applied from the selected theme.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Secondary text showing the theme's text hierarchy.
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Buttons & Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="contained" color="primary">
            Primary Button
          </Button>
          <Button variant="contained" color="secondary">
            Secondary Button
          </Button>
          <Button variant="outlined" color="primary">
            Outlined Primary
          </Button>
          <Button variant="outlined" color="secondary">
            Outlined Secondary
          </Button>
          <Button variant="text" color="primary">
            Text Primary
          </Button>
          <Button variant="text" color="secondary">
            Text Secondary
          </Button>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
          <Fab color="secondary" aria-label="favorite">
            <FavoriteIcon />
          </Fab>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Form Components
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
          <TextField
            label="Primary Input"
            variant="outlined"
            color="primary"
            fullWidth
          />
          <TextField
            label="Secondary Input"
            variant="outlined"
            color="secondary"
            fullWidth
          />
          <TextField
            label="Filled Input"
            variant="filled"
            color="primary"
            fullWidth
          />
          <FormControlLabel
            control={<Switch color="primary" />}
            label="Primary Switch"
          />
          <FormControlLabel
            control={<Switch color="secondary" />}
            label="Secondary Switch"
          />
          <Box sx={{ width: '100%' }}>
            <Typography gutterBottom>Primary Slider</Typography>
            <Slider color="primary" defaultValue={30} />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography gutterBottom>Secondary Slider</Typography>
            <Slider color="secondary" defaultValue={60} />
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Cards & Content
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Sample Card
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Card subtitle
              </Typography>
              <Typography variant="body2">
                This card demonstrates how content looks with the selected theme.
              </Typography>
            </CardContent>
          </Card>
          
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>U</Avatar>
                <Box>
                  <Typography variant="h6">User Profile</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Example user with themed avatar
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Feedback & Status
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Alert severity="success">Success alert with theme colors</Alert>
          <Alert severity="error">Error alert with theme colors</Alert>
          <Alert severity="warning">Warning alert with theme colors</Alert>
          <Alert severity="info">Info alert with theme colors</Alert>
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Chip label="Primary Chip" color="primary" />
            <Chip label="Secondary Chip" color="secondary" />
            <Chip label="Default Chip" />
            <Badge badgeContent={4} color="primary">
              <MailIcon />
            </Badge>
            <Badge badgeContent={12} color="secondary">
              <NotificationsIcon />
            </Badge>
          </Box>
          
          <Box sx={{ width: '100%' }}>
            <Typography gutterBottom>Primary Progress</Typography>
            <LinearProgress color="primary" value={60} variant="determinate" />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography gutterBottom>Secondary Progress</Typography>
            <LinearProgress color="secondary" value={80} variant="determinate" />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};