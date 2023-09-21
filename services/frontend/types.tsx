import React from "react";
import {products} from "@/utils/products";

export interface ContainerProps{
  children: React.ReactNode
}

export interface FooterListProps{
  children: React.ReactNode
}

// export interface Product {
//   id: string;
//   category: Category;
//   name: string;
//   price: string;
//   isFeatured: boolean;
//   size: Size;
//   color: Color;
//   images: Image[]
// };
//
export interface ProductCardProps{
  data: any
}
