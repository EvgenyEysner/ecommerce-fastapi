"use client"

import React from "react"
import { CartProviderProps } from "@/types"
import { CartContextProvider } from "@/hooks/useCart"

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  return (
    <CartContextProvider>
      {children}
    </CartContextProvider>
  )
}
