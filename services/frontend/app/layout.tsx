import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import React from "react";
import { NavBar } from "@/app/components/navbar/NavBar";
import { Footer } from "@/app/components/footer/Footer";
import { CartProvider } from '@/providers/CartProvider';
import { Toaster } from 'react-hot-toast';
import { setupStore } from './store/store';
import ReduxProvider from '@/providers/ReduxProvider';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Online Shop',
  description: 'Online Shop',
}

const store = setupStore()

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${poppins.className} text-slate-700`}>
        <Toaster toastOptions={{
          style: {
            background: 'rgb(51 65 85)',
            color: '#FFFFFF',
          }
        }} />
        <CartProvider>
          <ReduxProvider>
            <div className='flex flex-col min-h-screen'>
              <NavBar />
              <main className='flex-grow'>{children}</main>
              <Footer />
            </div>
          </ReduxProvider>
        </CartProvider>
      </body>
    </html>
  )
}
