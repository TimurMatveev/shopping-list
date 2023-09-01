import { Gender, UserRole } from "./user.constants";

export type UserCreate = {
  avatar: string | null;
  email: string;
  gender: Gender;
  name: string;
  password: string;
};

export type User = {
  avatar: string | null;
  createdAt: Date;
  email: string;
  gender: Gender;
  id: number;
  name: string;
  role: UserRole;
  updatedAt: Date | null;
};
