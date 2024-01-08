import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/types";
import { addProductToCart as addProduct, decrementOneProduct, deleteAllProducts, deleteProduct, firstAddProductToCart, incrementOneProduct } from "@/store/reducers/CartSlice";

import { IUseCart } from "@/interfaces/cart.interface";
import { IProduct } from "@/interfaces/product.interface";
import { deleteAllProductInDB, deleteProductInDB } from "@/helpers/deleteProductInDB";
import addProductsToDB from "@/helpers/addProductToDB";
import changeOrderInDB from "@/helpers/changeOrderInDB";

const useCart = (): IUseCart => {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(state => state.cartReducer.products)
  const DBOrders = useAppSelector(state => state.userReducer.user?.orders)
  const user = useAppSelector(state => state.userReducer.user)

  // удаление продукта из корзины
  const deleteOneProductInCart = (id: number) => {
    if (cart.length === 1)
      window.sessionStorage.removeItem('productsInCart')

    dispatch(deleteProduct(id))
    const order = user?.orders.find(el => el.product.id === id)
    if (order && order.id)
      deleteProductInDB(order.id)
  }

  // общее количество товара в корзине
  const cartTotalQty = () => {
    const countProducts = cart.reduce((accumulator, product) => accumulator + product.quantity, 0)

    return countProducts
  }

  // добавление продукта в корзину
  const addProductToCart = async (product: IProduct) => {
    dispatch(addProduct(product))

    if (user) addProductsToDB([product], user.id)
    
    writeToSessionStorage()
  }

  // проверка продукта на наличие в корзине
  const isProductInCart = (id: number): boolean => {
    const product = cart.find(el => el.id === id)
    return !!product
  }

  // увеличение количества товара в корзине
  const decreaseProduct = (id: number): void => {
    const product = cart.find(el => el.id === id)
    if (product && user) changeOrderInDB(product.id, product.quantity - 1)

    dispatch(decrementOneProduct(id))
    writeToSessionStorage()
  }

  // уменьшение количества товара в корзине
  const increaseProduct = (id: number) => {
    const product = cart.find(el => el.id === id)
    if (product && user) changeOrderInDB(product.id, product.quantity + 1)

    dispatch(incrementOneProduct(id))
    writeToSessionStorage()
  }

  // очистить корзину
  const clearCart = () => {
    dispatch(deleteAllProducts())
    window.sessionStorage.removeItem('productsInCart')

    if (user?.orders)
      deleteAllProductInDB(user.orders)
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

  // слияние продуктов с бд и store
  const mergeCarts = () => {       
    // если пользователь не авторизован, то функция обрывается
    if (!user) return

    // получение продуктов из БД
    let DBCart: IProduct[] = []
    if (DBOrders) {
      DBCart = DBOrders.map(el => {
        return {
          ...el.product,
          quantity: el.quantity
        }
      })
    }

    // Удаление товаров из корзины в стейте, которые уже есть в БД, их записываем в бд
    const filteredCart = cart.filter(el => {
      const DBProduct = DBCart.find(product => product.id === el.id)
      return !DBProduct;
    });

    // Слияние корзины в БД и в стейте
    const newCart = DBCart.concat(filteredCart)    

    // Запись обновленной корзины в store
    dispatch(firstAddProductToCart(newCart))    

    // Добавление товаров в БД
    addProductsToDB(filteredCart, user.id)
  }

  useEffect(() => writeToSessionStorage(), [dispatch, writeToSessionStorage]);

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
    mergeCarts,
  };
};

export default useCart;