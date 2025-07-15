import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Login } from "../pages";
import { loginSchema, type LoginSchema } from "../schemas/login.schema";

const LoginProvider = () => {
  const methods = useForm<LoginSchema>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <Login />
    </FormProvider>
  );
};

export default LoginProvider;
