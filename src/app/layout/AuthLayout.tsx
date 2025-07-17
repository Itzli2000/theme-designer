import { Box } from '@mui/material';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: 'background.default',
      }}
    >
      <Outlet />
    </Box>
  );
};

export default AuthLayout;