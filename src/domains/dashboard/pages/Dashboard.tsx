import { useThemesStore } from "@domains/themes/store";
import {
  Add as AddIcon,
  Palette as PaletteIcon,
  Visibility as VisibilityIcon
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const { themes, pagination, isLoading, error, fetchThemes } =
  useThemesStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchThemes();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress sx={{ borderRadius: 1 }} />
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Loading your themes...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error" gutterBottom>
          Error loading dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #87CEEB 0%, #1E90FF 100%)',
          color: 'white',
          py: { xs: 6, md: 10 },
          px: { xs: 3, md: 4 },
          mb: 6,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            right: '15%',
            width: 120,
            height: 120,
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            display: { xs: 'none', md: 'block' },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '10%',
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            display: { xs: 'none', md: 'block' },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            left: '20%',
            width: 40,
            height: 40,
            borderRadius: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            transform: 'rotate(45deg)',
            display: { xs: 'none', md: 'block' },
          }}
        />
        
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 700,
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                Welcome to Theme Designer
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 4,
                  lineHeight: 1.6,
                  maxWidth: 600,
                }}
              >
                Create, customize, and manage beautiful Material-UI themes with ease. 
                Design systems that bring your vision to life.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/themes/create')}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    boxShadow: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      boxShadow: 'none',
                      transform: 'scale(1.02)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Create Theme
                </Button>
                <Button
                  variant="text"
                  size="large"
                  startIcon={<VisibilityIcon />}
                  onClick={() => navigate('/themes')}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    textTransform: 'none',
                    fontWeight: 400,
                    fontSize: '0.875rem',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Browse Themes
                </Button>
              </Box>
            </Grid>
            
            <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 2,
                  flexDirection: { xs: 'row', md: 'column' },
                  mt: { xs: 4, md: 0 },
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      fontWeight: 700,
                      color: 'white',
                    }}
                  >
                    {pagination?.total || 0}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                    }}
                  >
                    Total Themes
                  </Typography>
                </Box>
                
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      fontWeight: 700,
                      color: 'white',
                    }}
                  >
                    {themes?.length || 0}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                    }}
                  >
                    Active Themes
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Themes Section */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card
              sx={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: '1.5rem', md: '2rem' },
                      fontWeight: 500,
                      color: '#333333',
                    }}
                  >
                    Your Themes
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/themes/create')}
                    sx={{
                      borderColor: '#1E90FF',
                      color: '#1E90FF',
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        borderColor: '#0066CC',
                        backgroundColor: 'rgba(30, 144, 255, 0.04)',
                      },
                    }}
                  >
                    New Theme
                  </Button>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {themes?.map((theme) => (
                    <Card
                      key={theme.id}
                      sx={{
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                          transform: 'translateY(-1px)',
                        },
                      }}
                      onClick={() => navigate(`/themes/${theme.id}`)}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            sx={{
                              width: 48,
                              height: 48,
                              backgroundColor: theme.themeConfig?.palette?.primary?.main || '#1E90FF',
                            }}
                          >
                            <PaletteIcon />
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontSize: '1.1rem',
                                fontWeight: 500,
                                color: '#333333',
                                mb: 0.5,
                              }}
                            >
                              {theme.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#757575',
                                fontSize: '0.875rem',
                              }}
                            >
                              {theme.description || 'No description available'}
                            </Typography>
                          </Box>
                          <Chip
                            label={theme.themeConfig?.palette?.mode || 'light'}
                            size="small"
                            variant="outlined"
                            sx={{
                              textTransform: 'capitalize',
                              borderColor: '#E0E0E0',
                              color: '#757575',
                            }}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {themes?.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                      <PaletteIcon sx={{ fontSize: 48, color: '#E0E0E0', mb: 2 }} />
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#757575',
                          mb: 1,
                          fontSize: '1.1rem',
                        }}
                      >
                        No themes found
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#757575',
                          mb: 3,
                        }}
                      >
                        Create your first theme to get started
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/themes/create')}
                        sx={{
                          backgroundColor: '#1E90FF',
                          borderRadius: '8px',
                          textTransform: 'none',
                          fontWeight: 500,
                          '&:hover': {
                            backgroundColor: '#0066CC',
                          },
                        }}
                      >
                        Create Theme
                      </Button>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Quick Actions Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1.25rem',
                    fontWeight: 500,
                    color: '#333333',
                    mb: 3,
                  }}
                >
                  Quick Actions
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/themes/create')}
                    sx={{
                      borderColor: '#1E90FF',
                      color: '#1E90FF',
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 500,
                      py: 1.5,
                      '&:hover': {
                        borderColor: '#0066CC',
                        backgroundColor: 'rgba(30, 144, 255, 0.04)',
                      },
                    }}
                  >
                    Create New Theme
                  </Button>
                  
                  <Button
                    variant="text"
                    fullWidth
                    startIcon={<VisibilityIcon />}
                    onClick={() => navigate('/themes')}
                    sx={{
                      color: '#1E90FF',
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontWeight: 400,
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'rgba(30, 144, 255, 0.04)',
                      },
                    }}
                  >
                    Browse All Themes
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
