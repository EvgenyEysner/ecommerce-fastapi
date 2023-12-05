import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import useCart from "@/hooks/useCart";
import { useAppSelector } from "@/store/types";

export const CartCount: React.FC = () => {
  const { cartTotalQty } = useCart();
  const [count, setCount] = useState(cartTotalQty())
  const cartProducts = useAppSelector(state => state.cartReducer.products)

  useEffect(() => {
    setCount(cartTotalQty())
  }, [cartProducts])
  
  return (
    <Link className='relative cursor-pointer' href='/cart'>
      <div className='text-3xl'>
        <CiShoppingCart />
      </div>
      <span className='absolute top-[-10px] right-[-10px] bg-slate-700 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm'>
        {/* количество товаров в корзине */}
        {count}
      </span>
    </Link>
  );
}