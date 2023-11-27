import React from 'react';
import { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { NavBar } from './Header/NavBar';
import { Footer } from './Footer/Footer';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Online Shop',
  description: 'Online Shop',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <>
      <div className={`flex flex-col min-h-screen ${poppins.className} text-slate-700`}>
        <NavBar />
        <main className='flex-grow'>{children}</main>
        <Footer />  
      </div>
    </>
  )
}
