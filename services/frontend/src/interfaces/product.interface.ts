import { IUser } from "./user.interface";

export interface IProduct {
  id: number;
  category: ICategory;
  name: string;
  description: string;
  created_at: string;
  quantity: number;
  on_stock: boolean;
  brand: string;
  price: number;
  images: IImage[];
  ordered_by: IOrderedBy[];
  product_reviews: IProductReview[];
}

export interface IProductCart extends IProduct {
  maxQuantity: number;
}

export interface IProductReview {
  id: number;
  text: string;
  rating: number;
  owner: IUser;
  created_at?: string;
}

export interface IOrder {
  id: number;
  status: number;
  created_at: string;
  modified_at: string;
}

export interface IOrderedBy {
  id: number;
  status: number;
  user: IUser;
  created_at: string;
  modified_at: string;
}

export interface IReview {
  id: number;
  text: string;
  rating: number;
}

export interface IImage {
  id: number;
  name: string;
  src: string;
}

export interface ICategory {
  id?: number;
  name: string;
}
