// import ReduxProvider from '@/providers/ReduxProvider'
import '@/styles/globals.css'
import { wrapper } from '@/store/store'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

export default function App({ Component, ...rest }: AppProps) {  
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Provider store={store}>
      <Toaster toastOptions={{
          style: {
            background: 'rgb(51 65 85)',
            color: '#FFFFFF',
          }
        }} 
      />
      <Component {...props.pageProps} />
    </Provider>
  )
}

// export default wrapper.useWrappedStore()
// export default wrapper.withRedux(App)
