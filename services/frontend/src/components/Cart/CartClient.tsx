import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '@/store/types';
import { cartSlice, deleteAllProducts } from '@/store/reducers/CartSlice';
import useCart from '@/hooks/useCart';
import { IProductCart } from '@/interfaces/product.interface';
import { formatPrice } from '@/helpers/formatPrice';
import { Heading } from '../Product/Heading';
import { ItemContent } from './ItemContent';
import { CartButton } from '@/UI/CartButton';
import { useRouter } from 'next/router';

interface CartClientProps {
  isAuth: boolean
}

export const CartClient: React.FC<CartClientProps> = ({ isAuth }) => {
  const {clearCart, cartTotalAmount} = useCart()
  const router = useRouter()
  const cartProducts = useAppSelector(state => state.cartReducer.products)
  
  if (cartProducts.length === 0) {
    return (
      <div className='flex flex-col items-center'>
        <div className='text-2xl'>Ваша корзина пуста</div>
        <div>
          <Link href={"/"} className='text-slate-500 flex items-center gap-1 mt-2'>
            <MdArrowBack />
            <span>Start Shopping!</span>
          </Link>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Heading title='Корзина' center />
      <div className='grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8'>
        <div className='col-span-2 justify-self-start text-transform: uppercase'>Наименование</div>
        <div className='justify-self-center text-transform: uppercase'>Цена</div>
        <div className='justify-self-center text-transform: uppercase'>Количество</div>
        <div className='justify-self-end text-transform: uppercase'>Сумма</div>
      </div>
      <div>
        {cartProducts.map(item => {
          return (
            <ItemContent key={item.id} item={item} />
          )
        })}
      </div>
      <div className='border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4'>
        <div className='w-[90px]'>
          <CartButton 
            label='Очистить' 
            small 
            outline 
            onClick={clearCart} 
          />
        </div>
        <div className='text-sm flex gap-1 flex-col items-start'>
          <div className='flex justify-between w-full text-base semibold'>
            <span className='font-semibold'>Сумма</span>
            <span className='font-semibold'>{formatPrice(cartTotalAmount())}</span>
          </div>
          <p className='text-slate-500'>Taxes and shipping at checkout</p>
          <CartButton label='Оформить покупку' onClick={() => {
            if (!isAuth) router.push('/login')
            else {}
          }} />
          <Link href={"/"} className='text-slate-500 flex items-center gap-1 mt-2'>
            <MdArrowBack />
            <span>Вернуться к покупкам</span> 
          </Link>
        </div>
      </div>
    </div>
  )
}
