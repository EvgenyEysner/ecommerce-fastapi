import { IProductCart } from "./product.interface";

export interface IUseCart {
  deleteOneProductInCart(id: number): void;
  cartTotalQty(): number;
  addProductToCart(product: IProductCart): void;
  isProductInCart(id: number): boolean;
  decreaseProduct(id: number): void;
  increaseProduct(id: number): void;
  clearCart(): void;
  cartTotalAmount(): number;
}
