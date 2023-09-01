export type UserCreateDto = {
  email: string;
  gender: string;
  name: string;
  password: string;
  avatar?: string;
}

export type UserDto = {
  createdAt: number;
  email: string;
  gender: string;
  id: number;
  name: string;
  password: string;
  avatar?: string;
  role?: string;
  updatedAt?: number;
};
