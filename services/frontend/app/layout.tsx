import './globals.css'
import type {Metadata} from 'next'
import {Poppins} from 'next/font/google'
import React from "react";
import {NavBar} from "@/app/components/navbar/NavBar";
import {Footer} from "@/app/components/footer/Footer";

const poppins = Poppins({subsets: ['latin'], weight: ['400', '700']})

export const metadata: Metadata = {
  title: 'Online Shop',
  description: 'Online Shop',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
  return (
    <html lang="ru">
    <body className={`${poppins.className} text-slate-700`}>
    <div className='flex flex-col min-h-screen'>
      <NavBar/>
      <main className='flex-grow'>{children}</main>
      <Footer/>
    </div>
    </body>
    </html>
  )
}
