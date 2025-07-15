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
  } = useAuthStore();

  const onSubmit = ({ email, password }: LoginSchema) => {
    clearError();
    login(email, password);
  };

  const isLoggedIn = isAuthenticated && user;

  return {
    isLoggedIn,
    login,
    logout,
    isLoading,
    error,
    onSubmit,
  };
};

export default useAuth;
