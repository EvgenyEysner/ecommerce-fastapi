import { useEffect } from "react";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "@/store/types";
import { addProductToCart as addProduct, decrementOneProduct, deleteAllProducts, deleteProduct, incrementOneProduct } from "@/store/reducers/CartSlice";

import { IUseCart } from "@/interfaces/cart.interface";
import { IProductCart } from "@/interfaces/product.interface";
import { IOrder } from "@/interfaces/user.interface";

const useCart = (): IUseCart => {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(state => state.cartReducer.products)

  // удаление продукта из корзины
  const deleteOneProductInCart = (id: number) => {
    if (cart.length === 1)
      window.sessionStorage.removeItem('productsInCart')

    dispatch(deleteProduct(id))
  }

  // общее количество товара в корзине
  const cartTotalQty = () => {
    const countProducts = cart.reduce((accumulator, product) => accumulator + product.quantity, 0)

    return countProducts
  }

  // добавление продукта в корзину
  const addProductToCart = async (product: IProductCart) => {
    dispatch(addProduct(product))
    writeToSessionStorage()
  };

  // проверка продукта на наличие в корзине
  const isProductInCart = (id: number): boolean => {
    // const productsInCart = typeof window !== 'undefined' ? window.sessionStorage.getItem('productsInCart') : null;
    // if (productsInCart) {
    //   const products: IProductCart[] = JSON.parse(productsInCart)
    //   const product = products.find(el => el.id === id)
    //   return !!product
    // }
    // return false
    const product = cart.find(el => el.id === id)
    return !!product
  }

  // увеличение количествва товара в корзине
  const decreaseProduct = (id: number): void => {
    dispatch(decrementOneProduct(id))
  }

  // уменьшение количества товара в корзине
  const increaseProduct = (id: number) => {
    dispatch(incrementOneProduct(id))
  }

  // очистить корзину
  const clearCart = () => {
    dispatch(deleteAllProducts())
    window.sessionStorage.removeItem('productsInCart')
  }

  // суммарная стоимость корзины
  const cartTotalAmount = () => {
    const price = cart.reduce((accumulator, product) => accumulator + (product.quantity * product.price), 0)
    return price
  }

  const writeToSessionStorage = () => {
    if (cart.length !== 0)
      window.sessionStorage.setItem('productsInCart', JSON.stringify(cart))
  }

  // сложение продуктов с бд и из session storage
  const summationProducts = () => {    
    // const productsInSessionStorage = typeof window !== 'undefined' ? window.sessionStorage.getItem('productsInCart') : null;
    // if (productsInSessionStorage) {
    //   let newOrders: IOrder[] = []
    //   if (DBOrders) {
    //     newOrders = [ ...DBOrders ]
    //   }

    //   const STOrders: IProductCart[] = JSON.parse(productsInSessionStorage)

    //   STOrders.forEach(el => {
    //     const hasInDB = newOrders.find(order => order.product.id === el.id)

    //     if (!hasInDB) {
    //       const changedOrder: IOrder = {
    //         status: 1,
    //         product: el
    //       }

    //       // axios.post('/order', changedOrder, { withCredentials: true })

    //       newOrders.push(changedOrder)
    //     }
    //   });

    //   const productCart: IProductCart[] = newOrders.map(el => {
    //     return {
    //       ...el.product,
    //       maxQuantity: 15,
    //     }
    //   })
    //   window.sessionStorage.setItem('productsInCart', JSON.stringify(productCart))
    //   dispatch(firstAddProductToCart(productCart))
    // }
    // dispatch(checkDataBase())
  }

  useEffect(() => {
    writeToSessionStorage();
  }, [dispatch, writeToSessionStorage]);

  return {
    addProductToCart,
    cartTotalQty, 
    isProductInCart, 
    deleteOneProductInCart, 
    decreaseProduct, 
    increaseProduct, 
    clearCart,
    cartTotalAmount,
    writeToSessionStorage,
    summationProducts,
  };
};

export default useCart;