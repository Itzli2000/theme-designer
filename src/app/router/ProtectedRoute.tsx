import { Navigate, useLocation } from 'react-router';
import { Box, CircularProgress, Typography } from '@mui/material';
// import { useAuth } from '@/domains/auth/hooks/useAuth';

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
  // const { user, isLoading, isAuthenticated } = useAuth();
  
  // Temporary mock values - replace with actual auth hook
  const isLoading = false;
  const isAuthenticated = true; // Change to false to test redirect
  const user = { id: 1, name: 'Test User' }; // Mock user
  
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