import React from "react";
import { IconType } from "react-icons"


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

export interface CartButtonProps {
  label: string
  disabled?: boolean
  outline?: boolean
  small?: boolean
  custom?: string
  icon?: IconType
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export interface ProductImageProps {
  cartProduct: CartProductType,
  product: any,
  handleColorSelect: (value: SelectedImgType) => void
}

export interface ListRatingProps {
  product: any,
}

export interface HeadingProps {
  title: string,
  center?: boolean,
}

export interface AvatarProps {
  src: string | null | undefined
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
