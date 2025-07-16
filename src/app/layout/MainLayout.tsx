import { Box, AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import { Outlet } from 'react-router';
import { useAuthStore } from '@domains/auth/stores';

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Theme Designer
          </Typography>
          <Button color="inherit" onClick={() => useAuthStore.getState().logout()}>Logout</Button>
        </Toolbar>
      </AppBar>
      
      <Container component="main" sx={{ flex: 1, py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default MainLayout;