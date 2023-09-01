export type ProductDto = {
  name: string;
}

export type ShoppingCreateDto = {
  name: string;
  userId: number;
  products: Record<string, ProductDto[]>;
  status: string;
}

export type ShoppingDto = {
  name: string;
  userId: number;
  products: Record<string, ProductDto[]>;
  id: number;
  createdAt: number;
  status: string;
  updatedAt?: number;
  shareWith?: number[];
  implementerId?: number;
}
