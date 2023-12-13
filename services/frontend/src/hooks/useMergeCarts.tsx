import addProductsToDB from "@/helpers/addProductToDB";
import { IProduct } from "@/interfaces/product.interface";
import { firstAddProductToCart } from "@/store/reducers/CartSlice";
import { AppState } from "@/store/store";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

// сложение продуктов с бд и store
const useMergeCart = (store: ToolkitStore) => {  
  const state: AppState = store.getState()
  const user = state.userReducer.user
  const DBOrders = state.userReducer.user?.orders
  const cart = state.cartReducer.products

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
    store.dispatch(firstAddProductToCart(newCart))    

    // Добавление товаров в БД
    addProductsToDB(filteredCart, user.id)
  }

  return { mergeCarts }
}

export default useMergeCart