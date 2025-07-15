import React from 'react';
import { Typography, Box, Card, CardContent, Button, TextField, Avatar } from '@mui/material';
import { useParams } from 'react-router';

const Profile: React.FC = () => {
  const { section } = useParams();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile {section && `- ${section}`}
      </Typography>
      
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ width: 80, height: 80, mr: 3 }}>
              U
            </Avatar>
            <Box>
              <Typography variant="h5">
                User Name
              </Typography>
              <Typography variant="body2" color="text.secondary">
                user@example.com
              </Typography>
            </Box>
          </Box>
          
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Full Name"
              defaultValue="User Name"
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Email"
              defaultValue="user@example.com"
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Bio"
              multiline
              rows={3}
              defaultValue="Theme designer and developer"
              fullWidth
              variant="outlined"
            />
            
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button variant="contained" size="large">
                Save Changes
              </Button>
              <Button variant="outlined" size="large">
                Cancel
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;