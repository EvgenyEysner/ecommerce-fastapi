import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { parseCookies } from 'nookies'

import { wrapper } from '@/store/store'
import { addUser } from '@/store/reducers/UserSlice'
import { firstAddProductToCart } from '@/store/reducers/CartSlice'

import { IUser } from '@/interfaces/user.interface'
import { ICategory, IProduct } from '@/interfaces/product.interface'

import '@/styles/globals.css'
import useMergeCarts from '@/hooks/useMergeCarts'
import { addAllCategories } from '@/store/reducers/CategoriesSlice'
import Head from 'next/head'

const App = ({ Component, ...rest }: AppProps) => {
  const {store, props} = wrapper.useWrappedStore(rest);  

  const { mergeCarts } = useMergeCarts(store)
  
  useEffect(() => {    
    const cart = store.getState().cartReducer.products
    const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage.getItem('productsInCart') : null;
    if (sessionStorage && cart.length === 0) {
      const cartProducts: IProduct[] = JSON.parse(sessionStorage)
      store.dispatch(firstAddProductToCart(cartProducts))
    }
  }, [])  

  useEffect(() => mergeCarts(), [])
  
  return (
    <Provider store={store}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="магазин, онлайн, техника" />
        <title>Online-Shop</title>
      </Head>
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

App.getInitialProps = wrapper.getInitialAppProps(store => async ({ ctx }) => {
  try {
    const cookies = parseCookies(ctx)
          
    const response = await fetch('http://localhost:5000/users/whoami', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: Object.keys(cookies).map(cookieName => `${cookieName}=${cookies[cookieName]}`).join('; ')
      },
    });

    let user: IUser | null = null

    if (response.ok) {
      user = await response.json();
      user && store.dispatch(addUser(user))   
    }

    const categoriesResponse = await fetch('http://localhost:5000/categories', {next: { revalidate: 300 }})

    if (categoriesResponse.ok) {
      const categories: ICategory[] = await categoriesResponse.json()
      store.dispatch(addAllCategories(categories))
    }    

    return { pageProps: { user } };
  } catch (error) {
    console.log(error);
    
    return { pageProps: { user: null } };
  }
});

export default App;
