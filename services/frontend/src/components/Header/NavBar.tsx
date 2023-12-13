import React from "react";
import Link from "next/link";
import { Redressed } from "next/font/google";
import { Container } from "../Container";
import { CartCount } from "./CartCount";
import { useAppSelector } from "@/store/types";

const redressed = Redressed({ subsets: ['latin'], weight: ['400'] });
export const NavBar: React.FC = () => {
  const user = useAppSelector(state => state.userReducer.user)

  return (
    <div className='sticky top-0 w-full bg-slate-200 z-30 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex items-center justify-between gap-3 md:gap-0'>
            <Link href='/' className={`${redressed.className} font-bold text-2xl`}>
              Online Shop
            </Link>
            <div className='hidden md:block'>Поиск</div>
            <div className='flex items-center md:12 gap-8'>
              <div>
                <CartCount />
              </div>
              {user 
                ? <Link href={'/'}>UserMenu</Link>
                : <Link href={'/login'}>LogIn</Link>
              }
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
