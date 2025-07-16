import { useAuthStore } from "../stores";
import type { LoginSchema } from "../schemas/login.schema";

const useAuth = () => {
  const {
    user,
    isAuthenticated,
    login,
    logout,
    isLoading,
    error,
    clearError,
    validateToken,
  } = useAuthStore();

  const onSubmit = ({ email, password }: LoginSchema) => {
    clearError();
    login(email, password);
  };

  const isLoggedIn = isAuthenticated && user && validateToken();

  return {
    user,
    isLoggedIn,
    login,
    logout,
    isLoading,
    error,
    onSubmit,
  };
};

export default useAuth;
