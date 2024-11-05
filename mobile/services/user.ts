import { AuthResponse } from "@/types/user";
import { Api } from "@/services/api";

const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  return Api.post("/auth/login", { email, password });
};

const register = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  return Api.post("/auth/register", { email, password });
};

const userService = {
  login,
  register,
};

export { userService };
