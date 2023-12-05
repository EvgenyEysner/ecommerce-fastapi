import {useEffect} from 'react'
import type {AppProps} from 'next/app'
import {Provider} from 'react-redux'
import {Toaster} from 'react-hot-toast'
import {parseCookies} from 'nookies'

import {wrapper} from '@/store/store'
import {addUser} from '@/store/reducers/UserSlice'
import {firstAddProductToCart} from '@/store/reducers/CartSlice'

import {IUser} from '@/interfaces/user.interface'
import {IProductCart} from '@/interfaces/product.interface'

import '@/styles/globals.css'

const App = ({Component, ...rest}: AppProps) => {
  const {store, props} = wrapper.useWrappedStore(rest);

  useEffect(() => {
    const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage.getItem('productsInCart') : null;
    if (sessionStorage) {
      const cartProducts: IProductCart[] = JSON.parse(sessionStorage)
      store.dispatch(firstAddProductToCart(cartProducts))
    }
  }, [])

  return (
    <Provider store={store}>
      <Toaster toastOptions={{
        style: {
          background: 'rgb(51 65 85)',
          color: '#FFFFFF',
        }
      }}
      />
      <Component {...props} />
    </Provider>
  )
}

App.getInitialProps = wrapper.getInitialAppProps(store => async ({ctx}) => {
  try {
    const cookies = parseCookies(ctx)

    const response = await fetch('http://127.0.0.1:5000/users/whoami', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: Object.keys(cookies).map(cookieName => `${cookieName}=${cookies[cookieName]}`).join('; ')
      },
    });

    let user: IUser | null = null
    let cartProducts: IProductCart[] = []

    if (response.ok) {
      user = await response.json();
      user && store.dispatch(addUser(user))

      if (user?.orders && user?.orders.length !== 0) {
        cartProducts = user.orders.map(el => {
          return {
            ...el.product,
            maxQuantity: 15
          }
        })

        // Добавить сложение заказов, которые в бд и стейте
        // store.dispatch(firstAddProductToCart(cartProducts))
      }

    } else {
      throw new Error('Ошибка при запросе')
    }

    return {pageProps: {user, cartProducts}};
  } catch (error) {
    return {pageProps: {user: null, cartProducts: []}};
  }
});

export default App;
