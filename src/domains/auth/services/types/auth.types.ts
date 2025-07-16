import type { User } from "../../stores/types";

export type RegisterResponse = {
  user: User;
  access_token: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  access_token: string;
};