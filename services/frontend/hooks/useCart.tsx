import { createContext, useState, useContext } from "react";
import { CartContextType, ProviderProps } from "@/types";

export const CartContext = createContext<CartContextType | null>(null)

export const CartContextProvider = (props: ProviderProps) => {

  const [cartTotalQty, setCartTotalQty] = useState(0)
  const value = { cartTotalQty }

  return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (context === null) {
    throw new Error('useCart must be a CartContextProvider')
  }

  return context
}
