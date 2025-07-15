import React from 'react';
import { Typography, Box, Card, CardContent, Button, TextField } from '@mui/material';

const ThemeCreate: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Create New Theme
      </Typography>
      
      <Card>
        <CardContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Theme Name"
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Description"
              multiline
              rows={3}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Primary Color"
              type="color"
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Secondary Color"
              type="color"
              fullWidth
              variant="outlined"
            />
            
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button variant="contained" size="large">
                Create Theme
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

export default ThemeCreate;