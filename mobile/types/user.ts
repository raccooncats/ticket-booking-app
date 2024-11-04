import { ApiResponse } from "@/types/api";

export enum UserRole {
  Manager = "manager",
  Attendee = "attendee",
}

export type AuthResponse = ApiResponse<{ token: string; user: User }>;

export type User = {
  id: number;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};
