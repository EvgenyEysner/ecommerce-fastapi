import { createContext, useState, useContext } from "react";
import { CartContextType, CartProductType, ProviderProps } from "@/types";
import { useCallback, useEffect } from "react";
import { toast } from "react-hot-toast"

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

      toast.success(product.name + ' добавлен в корзину')
      localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
      return updatedCart
    })
  }, [])

  const handleRemoveProductFormCart = useCallback((product: CartProductType) => {
    if (cartProducts) {
      const filteredProducts = cartProducts.filter((item) => {
        return item.id !== product.id
      })

      setCartProducts(filteredProducts)
      toast.success(product.name + ' удалён')
      localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts))

    }
  }, [cartProducts])

  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFormCart
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
