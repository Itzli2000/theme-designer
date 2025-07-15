import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { RHFTextField } from "@shared/components/RHFTextField";
import { useFormContext } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import type { LoginSchema } from "../schemas/login.schema";

const Login = () => {
  const { onSubmit, isLoading, error } = useAuth();
  const { handleSubmit } = useFormContext<LoginSchema>();

  return (
    <Card>
      <CardContent>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to your account
          </Typography>
        </Box>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <RHFTextField<LoginSchema> name="email" label="Email" />
          <RHFTextField<LoginSchema> name="password" label="Password" />

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
            {isLoading ? "Loading..." : "Sign In"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Login;
