import { Alert, Box, Button, Card, CardContent, Typography } from '@mui/material';
import { RHFTextField } from '@shared/components/RHFTextField';
import { useFormContext } from 'react-hook-form';
import { type RegisterSchema } from '../schemas/register.schema';
import { useRegisterStore } from '../stores';

const Register = () => {
  const { isLoading, error, register } = useRegisterStore();  
  const { handleSubmit } = useFormContext<RegisterSchema>();
  
  const onSubmit = (data: RegisterSchema) => {
    register(data);
  };

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
        
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField<RegisterSchema>
            name="firstName"
            label="First Name"
          />
          <RHFTextField<RegisterSchema>
            name="lastName"
            label="Last Name"
          />
          <RHFTextField<RegisterSchema>
            name="email"
            label="Email"
          />
          <RHFTextField<RegisterSchema>
            name="password"
            label="Password"
            type="password"
          />
          <RHFTextField<RegisterSchema>
            name="confirmPassword"
            label="Confirm Password"
            type="password"
          />
          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}  
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
            type="submit"
            disabled={isLoading}
          >
            Create Account
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Register;