import { Gender, User } from "../../../modules/users";

export type AuthData = {
  id: User['id'];
  keepLoggedIn: boolean;
  loginAt: number;
}

export type LoginData = {
  email: string;
  password: string;
  keepLoggedIn: boolean;
}

export type SignUpData = LoginData & {
  avatar: string | null;
  gender: Gender;
  name: string;
}

const resp = fetch('');
