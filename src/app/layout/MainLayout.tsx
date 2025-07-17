import { useAuthStore } from "@domains/auth/stores";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Outlet } from "react-router";
import { Link as RouterLink, useLocation } from "react-router";
import { ROUTES } from "@app/router/constants";

const MainLayout = () => {
  const { user, logout } = useAuthStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  // Helper function to check if route is active
  const isActiveRoute = (route: string) => {
    if (route === ROUTES.HOME) {
      return location.pathname === '/' || location.pathname === ROUTES.HOME;
    }
    return location.pathname.startsWith(route);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar 
        position="static" 
        sx={{
          background: 'linear-gradient(135deg, #87CEEB 0%, #1E90FF 100%)',
          boxShadow: '0 2px 20px rgba(30, 144, 255, 0.3)',
          minHeight: 64,
        }}
      >
        <Toolbar 
          sx={{ 
            minHeight: 64,
            px: { xs: 2, md: 3 },
            py: 1,
          }}
        >
          {!user ? (
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1,
                fontWeight: 600,
                fontSize: '1.5rem',
                color: 'white',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              Theme Designer
            </Typography>
          ) : (
            <>
              {/* Left Section - User Info */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexGrow: 1,
                }}
              >
                <Avatar
                  {...stringAvatar(user?.firstName + " " + user?.lastName)}
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    fontSize: 16,
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    fontWeight: 500,
                  }}
                >
                  {user?.firstName.charAt(0)}
                  {user?.lastName.charAt(0)}
                </Avatar>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Typography 
                    variant="h6" 
                    component="div"
                    sx={{
                      fontWeight: 500,
                      fontSize: '1.1rem',
                      color: 'white',
                      fontFamily: 'Roboto, sans-serif',
                    }}
                  >
                    {user?.firstName} {user?.lastName}
                  </Typography>
                </Box>
                
                {/* Navigation Buttons */}
                <Box sx={{ 
                  display: { xs: 'none', md: 'flex' }, 
                  gap: 1, 
                  ml: 4,
                }}>
                  <Button
                    component={RouterLink}
                    to={ROUTES.HOME}
                    sx={{
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      px: 2,
                      py: 1,
                      borderRadius: '8px',
                      backgroundColor: isActiveRoute(ROUTES.HOME) 
                        ? 'rgba(255, 255, 255, 0.2)' 
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button
                    component={RouterLink}
                    to={ROUTES.THEMES}
                    sx={{
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      px: 2,
                      py: 1,
                      borderRadius: '8px',
                      backgroundColor: isActiveRoute(ROUTES.THEMES) 
                        ? 'rgba(255, 255, 255, 0.2)' 
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    Themes
                  </Button>
                  <Button
                    component={RouterLink}
                    to={ROUTES.PROFILE}
                    sx={{
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      px: 2,
                      py: 1,
                      borderRadius: '8px',
                      backgroundColor: isActiveRoute(ROUTES.PROFILE) 
                        ? 'rgba(255, 255, 255, 0.2)' 
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    Profile
                  </Button>
                </Box>
              </Box>
              
              {/* Mobile Navigation Menu - Simple button approach */}
              {isMobile && (
                <Box sx={{ 
                  display: { xs: 'flex', md: 'none' }, 
                  gap: 0.5,
                  ml: 2,
                }}>
                  <Button
                    component={RouterLink}
                    to={ROUTES.HOME}
                    sx={{
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      px: 1,
                      py: 0.5,
                      minWidth: 'auto',
                      borderRadius: '6px',
                      backgroundColor: isActiveRoute(ROUTES.HOME) 
                        ? 'rgba(255, 255, 255, 0.2)' 
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Home
                  </Button>
                  <Button
                    component={RouterLink}
                    to={ROUTES.THEMES}
                    sx={{
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      px: 1,
                      py: 0.5,
                      minWidth: 'auto',
                      borderRadius: '6px',
                      backgroundColor: isActiveRoute(ROUTES.THEMES) 
                        ? 'rgba(255, 255, 255, 0.2)' 
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Themes
                  </Button>
                  <Button
                    component={RouterLink}
                    to={ROUTES.PROFILE}
                    sx={{
                      color: 'white',
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      px: 1,
                      py: 0.5,
                      minWidth: 'auto',
                      borderRadius: '6px',
                      backgroundColor: isActiveRoute(ROUTES.PROFILE) 
                        ? 'rgba(255, 255, 255, 0.2)' 
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Profile
                  </Button>
                </Box>
              )}
            </>
          )}
          
          {/* Logout Button */}
          {user && (
            <Button
              onClick={() => logout()}
              startIcon={<LogoutIcon sx={{ fontSize: 16 }} />}
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                textTransform: 'none',
                fontWeight: 400,
                fontSize: '0.875rem',
                px: 2,
                py: 1,
                borderRadius: '8px',
                ml: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {!isMobile && 'Logout'}
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container 
        component="main" 
        sx={{ 
          flex: 1, 
          py: 4,
          px: { xs: 2, md: 3 },
          backgroundColor: '#FFFFFF',
          maxWidth: '1200px',
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default MainLayout;
