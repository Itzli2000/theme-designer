import React from 'react';
import { Typography, Box, Card, CardContent, Button, TextField } from '@mui/material';

const Register = () => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Register
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create your account
          </Typography>
        </Box>
        
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
          />
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            Create Account
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Register;