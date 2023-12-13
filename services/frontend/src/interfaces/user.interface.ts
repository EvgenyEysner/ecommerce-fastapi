import { ICategory, IImage, IProduct } from "./product.interface";

export interface IUser {
  id: number;
  email: string;
  full_name: string;
  is_admin: boolean;
  created_at?: string;
  modified_at?: string;
  orders: IOrder[];
  reviews: IReview[];
}

interface IReview {
  id: number;
  text: string;
  rating: number;
  product: IProduct2;
  created_at: string;
}

export interface IProduct2 {
  id: number;
  category: ICategory;
  name: string;
  description: string;
  created_at: string;
  modified_at: string;
  quantity: number;
  on_stock: boolean;
  brand: string;
  price: number;
  images: IImage[];
  ordered_by: IOrderedBy[];
}

interface IOrderedBy {
  id: number;
  status: number;
  created_at: string;
  modified_at: string;
}

export interface IOrder {
  id?: number;
  status: number;
  product: IProduct;
  user: {
    id: number | string;
    email: string;
    full_name: string;
    is_admin: boolean;
    reviews: any[];
  };
  quantity: number;
  total: number;
  created_at?: string;
  modified_at?: string;
}
