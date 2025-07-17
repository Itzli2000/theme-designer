import { 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  Avatar,
  Container,
} from '@mui/material';
import { useParams } from 'react-router';

const Profile = () => {
  const { section } = useParams();

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
              U
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
                User Name
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 2,
                }}
              >
                user@example.com
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
                label="Full Name"
                defaultValue="User Name"
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
                defaultValue="user@example.com"
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
                label="Bio"
                multiline
                rows={4}
                defaultValue="Theme designer and developer creating beautiful user interfaces with passion for clean, modern design and user experience."
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
                  variant="contained" 
                  size="large"
                  sx={{
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
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Save Changes
                </Button>
                <Button 
                  variant="text" 
                  size="large"
                  sx={{
                    color: '#1E90FF',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    textTransform: 'none',
                    fontWeight: 400,
                    fontSize: '0.875rem',
                    '&:hover': {
                      backgroundColor: 'rgba(30, 144, 255, 0.04)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Cancel
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