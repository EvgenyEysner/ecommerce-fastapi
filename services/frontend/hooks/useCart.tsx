import { createContext, useState, useContext } from "react";
import { CartContextType, CartProductType, ProviderProps } from "@/types";
import { useCallback, useEffect } from "react";

export const CartContext = createContext<CartContextType | null>(null)

export const CartContextProvider = (props: ProviderProps) => {

  useEffect(() => {
    const cartItems: any = localStorage.getItem('eShopCartItems')
    const Products: CartProductType[] | null = JSON.parse(cartItems)
    setCartProducts(Products)
  }, [])

  const [cartTotalQty, setCartTotalQty] = useState(0)
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null)
  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart
      if (prev) {
        updatedCart = [...prev, product]
      } else {
        updatedCart = [product]
      }
      localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
      return updatedCart
    })
  }, [])
  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
  }

  return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (context === null) {
    throw new Error('useCart must be a CartContextProvider')
  }

  return context
}
