import React from "react";
import { IconType } from "react-icons"
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form"


// -------------------- Interfaces ------------------------- //
// props
export interface ContainerProps {
  children: React.ReactNode
}

export interface FooterListProps {
  children: React.ReactNode
}

export interface ProductCardProps {
  productId: number | string
}

export interface ProductDetailsProps {
  productId: string | number
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

export interface ProviderProps {
  [propName: string]: any
}

export interface CartProviderProps {
  children: React.ReactNode
}

export interface ItemContentProps {
  item: CartProductType
}

export interface InputProps {
  id: string
  label: string
  type?: string
  disabled?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}
// -------------------- Types ------------------------- //

export type CartProductType = {
  id: string,
  name: string,
  description: string,
  category: string,
  brand: string,
  selectedImg: SelectedImgType,
  on_stock: boolean,
  quantity: number,
  price: number

}

export type SelectedImgType = {
  color: string,
  colorCode: string,
  image: string
}

export interface IProductParams {
  productId?: string;
}

export interface IOrder {
  id?: number | string,
  status?: number | string,
  created_at?: Date,
  modified_at?: Date
}

export interface IUser {
  id?: number | string,
  username?: string,
  full_name?: string,
  password?: string,
  created_at?: Date,
  modified_at?: Date,
  is_admin?: boolean,
  orders?: IOrder[]
}

export interface IProductCardPreview {
  id: number | string,
  text?: string,
  rating?: number,
  owner: IUser
}

export type CartContextType = {
  cartTotalQty: number,
  cartTotalAmount: number,
  cartProducts: CartProductType[] | null
  handleAddProductToCart: (product: CartProductType) => void
  handleRemoveProductFormCart: (product: CartProductType) => void
  handleCartQtyIncrease: (product: CartProductType) => void
  handleCartQtyDecrease: (product: CartProductType) => void
  handleCartClear: () => void
}
