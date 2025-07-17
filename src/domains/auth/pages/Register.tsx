import {
  Alert,
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { RHFTextField } from '@shared/components';
import { useFormContext } from 'react-hook-form';
import { type RegisterSchema } from '../schemas/register.schema';
import { useRegisterStore } from '../stores';

const Register = () => {
  const { isLoading, error, register } = useRegisterStore();  
  const { handleSubmit } = useFormContext<RegisterSchema>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const onSubmit = (data: RegisterSchema) => {
    register(data);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      <Grid container sx={{ minHeight: '100vh' }}>
        {/* Left Panel - Gradient Background */}
        <Grid 
          size={{ xs: 12, md: 6 }} 
          sx={{
            background: 'linear-gradient(135deg, #87CEEB 0%, #1E90FF 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            minHeight: isMobile ? '40vh' : '100vh',
            padding: { xs: 3, md: 8 },
          }}
        >
          {/* Logo */}
          <Typography
            variant="h4"
            sx={{
              position: 'absolute',
              top: { xs: 24, md: 32 },
              left: { xs: 24, md: 32 },
              color: 'white',
              fontWeight: 500,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
            }}
          >
            Theme Designer
          </Typography>

          {/* Illustration Area */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              color: 'white',
              textAlign: 'center',
              maxWidth: 400,
            }}
          >
            {/* Abstract Geometric Shapes */}
            <Box
              sx={{
                width: { xs: 200, md: 300 },
                height: { xs: 200, md: 300 },
                position: 'relative',
                mb: 4,
              }}
            >
              {/* Main Rectangle */}
              <Box
                sx={{
                  width: '80%',
                  height: '80%',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  position: 'absolute',
                  top: '10%',
                  left: '10%',
                  borderRadius: '16px',
                }}
              />
              
              {/* Smaller decorative squares */}
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  position: 'absolute',
                  top: '15%',
                  right: '5%',
                  animation: 'float 3s ease-in-out infinite',
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                  },
                }}
              />
              
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  position: 'absolute',
                  bottom: '20%',
                  left: '10%',
                  animation: 'float 3s ease-in-out infinite 1.5s',
                }}
              />

              {/* Diamond shape */}
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  position: 'absolute',
                  top: '45%',
                  left: '45%',
                  transform: 'rotate(45deg)',
                  borderRadius: '4px',
                }}
              />
            </Box>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                mb: 2,
                color: 'white',
              }}
            >
              Join Theme Designer
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 1.6,
              }}
            >
              Create an account to start building amazing themes and join our community
            </Typography>
          </Box>
        </Grid>

        {/* Right Panel - Form */}
        <Grid 
          size={{ xs: 12, md: 6 }} 
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            minHeight: isMobile ? '60vh' : '100vh',
            padding: { xs: 3, md: 6 },
          }}
        >
          <Box
            sx={{
              maxWidth: 400,
              width: '100%',
              px: { xs: 2, md: 0 },
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 700,
                  color: '#333333',
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                Create Account
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#757575',
                  fontSize: '1rem',
                  lineHeight: 1.5,
                }}
              >
                Fill in your details to get started
              </Typography>
            </Box>

            <Box 
              component="form" 
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} 
              onSubmit={handleSubmit(onSubmit)}
            >
              <Box sx={{ display: 'flex', gap: 2 }}>
                <RHFTextField<RegisterSchema>
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#F8F9FA',
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: '#E0E0E0',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1E90FF',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1E90FF',
                      },
                    },
                  }}
                />
                <RHFTextField<RegisterSchema>
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#F8F9FA',
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: '#E0E0E0',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1E90FF',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1E90FF',
                      },
                    },
                  }}
                />
              </Box>

              <RHFTextField<RegisterSchema>
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#F8F9FA',
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: '#E0E0E0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#1E90FF',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1E90FF',
                    },
                  },
                }}
              />

              <RHFTextField<RegisterSchema>
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#F8F9FA',
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: '#E0E0E0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#1E90FF',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1E90FF',
                    },
                  },
                }}
              />

              <RHFTextField<RegisterSchema>
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#F8F9FA',
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: '#E0E0E0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#1E90FF',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1E90FF',
                    },
                  },
                }}
              />

              {error && (
                <Alert severity="error" sx={{ borderRadius: '8px' }}>
                  {error}
                </Alert>
              )}

              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ 
                  mt: 2,
                  backgroundColor: '#1E90FF',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#0066CC',
                    boxShadow: 'none',
                    transform: 'scale(1.02)',
                  },
                  '&:disabled': {
                    backgroundColor: '#E0E0E0',
                    color: '#757575',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;