import { ShoppingStatus } from "./shopping.constants";
import { User } from "../../users";
import { Category } from "../../categories";

export type Product = {
  name: string;
  bought: boolean;
};

export type ShoppingCreate = {
  name: string;
  userId: number;
  products: Map<Category['key'], Product[]>;
};

export type ShoppingShort = {
  name: string;
  userId: number;
  products: Map<Category['key'], Product[]>;
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  shareWith: number[];
  status: ShoppingStatus;
  implementerId: number | null;
};

export type Shopping = {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  name: string;
  products: Map<Category['key'], Product[]>;
  status: ShoppingStatus;
  user: User;
  shareWith: User[];
  implementer: User | null;
};
