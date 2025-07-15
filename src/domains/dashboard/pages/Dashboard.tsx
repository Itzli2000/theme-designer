import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Card>
        <CardContent>
          <Typography variant="h6">Welcome to Theme Designer</Typography>
          <Typography variant="body2" color="text.secondary">
            Start creating and managing your MUI themes here.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;