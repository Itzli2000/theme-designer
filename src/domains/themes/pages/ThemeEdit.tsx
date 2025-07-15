import React from 'react';
import { Typography, Box, Card, CardContent, Button, TextField } from '@mui/material';
import { useParams } from 'react-router';

const ThemeEdit = () => {
  const { id } = useParams();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Edit Theme {id}
      </Typography>
      
      <Card>
        <CardContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Theme Name"
              defaultValue={`Theme ${id}`}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Description"
              defaultValue="Sample theme description"
              multiline
              rows={3}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Primary Color"
              type="color"
              defaultValue="#1976d2"
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Secondary Color"
              type="color"
              defaultValue="#dc004e"
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

export default ThemeEdit;