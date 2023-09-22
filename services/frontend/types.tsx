import React from "react";


// -------------------- Interfaces ------------------------- //
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

export interface SetColorProps {
  images: SelectedImgType[]
  cartProduct: CartProductType
  handleColorSelect: (value: SelectedImgType) => void
}

export interface SetQuantityProps {
  cartCounter?: boolean
  cartProduct: CartProductType
  handleQtyIncrease: () => void
  handleQtyDecrease: () => void
}

// -------------------- Types ------------------------- //

export type CartProductType = {
  id: string,
  name: string,
  description: string,
  category: string,
  brand: string,
  selectedImg: SelectedImgType,
  quantity: number,
  price: number

}

export type SelectedImgType = {
  color: string,
  colorCode: string,
  image: string
}
