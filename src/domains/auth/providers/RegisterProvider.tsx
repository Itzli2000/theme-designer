import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Register } from "../pages";
import { registerSchema, type RegisterSchema } from "../schemas/register.schema";

const RegisterProvider = () => {
  const methods = useForm<RegisterSchema>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <Register />
    </FormProvider>
  );
};

export default RegisterProvider;
