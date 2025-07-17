import { ROUTES } from '@app/router/constants';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { useAuthStore } from '../../auth/stores/auth.store';

const Profile = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const { user, isLoading } = useAuthStore();

  // Generate initials from user's name
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Get full name from user data
  const getFullName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`;
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Typography>Loading profile...</Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Typography>No user data available</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Gradient Header Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #87CEEB 0%, #1E90FF 100%)',
          color: 'white',
          py: { xs: 6, md: 8 },
          px: { xs: 3, md: 4 },
          mb: 4,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: 100,
            height: 100,
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            display: { xs: 'none', md: 'block' },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '15%',
            left: '5%',
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            display: { xs: 'none', md: 'block' },
          }}
        />
        
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: { xs: 3, md: 4 },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            {/* Avatar Section */}
            <Avatar
              sx={{
                width: { xs: 100, md: 120 },
                height: { xs: 100, md: 120 },
                fontSize: { xs: '2rem', md: '2.5rem' },
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: '3px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                fontWeight: 500,
              }}
            >
              {getInitials(user.firstName, user.lastName)}
            </Avatar>
            
            {/* User Info Section */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                  fontWeight: 700,
                  mb: 1,
                  lineHeight: 1.2,
                }}
              >
                {getFullName(user.firstName, user.lastName)}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 2,
                }}
              >
                {user.email}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  color: 'rgba(255, 255, 255, 0.8)',
                  maxWidth: 400,
                }}
              >
                Theme designer and developer creating beautiful user interfaces
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Form Section */}
      <Container maxWidth="md">
        <Card
          sx={{
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          <CardContent
            sx={{
              p: { xs: 3, md: 4 },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 500,
                color: '#333333',
                mb: 1,
              }}
            >
              Profile Settings
              {section && (
                <Typography
                  component="span"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    fontWeight: 400,
                    color: '#757575',
                    ml: 1,
                  }}
                >
                  - {section}
                </Typography>
              )}
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: '#757575',
                mb: 4,
                fontSize: '1rem',
                lineHeight: 1.5,
              }}
            >
              Manage your account settings and profile information
            </Typography>
            
            <Box 
              component="form" 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 3,
              }}
            >
              <TextField
                label="First Name"
                defaultValue={user.firstName}
                fullWidth
                variant="outlined"
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
              
              <TextField
                label="Last Name"
                defaultValue={user.lastName}
                fullWidth
                variant="outlined"
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
              
              <TextField
                label="Email"
                defaultValue={user.email}
                fullWidth
                variant="outlined"
                disabled
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#F5F5F5',
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: '#E0E0E0',
                    },
                    '&.Mui-disabled': {
                      backgroundColor: '#F5F5F5',
                      '& fieldset': {
                        borderColor: '#E0E0E0',
                      },
                    },
                  },
                }}
              />
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  mt: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'stretch', sm: 'center' },
                }}
              >
                <Button 
                  size="large"
                  variant='outlined'
                  onClick={() => navigate(ROUTES.HOME)}
                >
                  Back
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Profile;