import React from "react";
import { products } from "@/utils/products";

export interface ContainerProps {
  children: React.ReactNode
}

export interface FooterListProps {
  children: React.ReactNode
}

export interface IParams {
  productId?: string;
};

export interface ProductCardProps {
  data: any
}

export interface ProductDetailsProps {
  product: any
}
