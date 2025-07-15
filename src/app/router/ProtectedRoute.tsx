import { Navigate, useLocation } from 'react-router';
import { Box, CircularProgress, Typography } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const LoadingScreen = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    minHeight="100vh"
    gap={2}
  >
    <CircularProgress size={48} />
    <Typography variant="body1" color="text.secondary">
      Verifying authentication...
    </Typography>
  </Box>
);

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoading = false;
  const isAuthenticated = true;
  const user = { id: 1, name: 'Test User' };
  
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        state={{ 
          from: location.pathname,
          message: 'You must log in to access this page'
        }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;