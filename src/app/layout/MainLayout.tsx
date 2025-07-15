import React from 'react';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Theme Designer
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container component="main" sx={{ flex: 1, py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default MainLayout;