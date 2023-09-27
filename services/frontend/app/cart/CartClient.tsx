'use client'
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import { Heading } from '../components/product/Heading';
import { CartButton } from '../components/button/CartButton';
import { ItemContent } from './ItemContent';

export const CartClient = () => {
  const { cartProducts, handleCartClear } = useCart()
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className='flex flex-col items-center'>
        <div className='text-2xl'>Ваша корзина пуста</div>
        <div>
          <Link href={"/"} className='text-slate-500 flex items-center gap-1 mt-2' />
          <MdArrowBack />
          <span>Start Shopping!</span>
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
        {cartProducts && cartProducts.map((item) => {
          return (
            <ItemContent key={item.id} item={item} />
          )
        })}
      </div>
      <div className='border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4'>
        <div className='w-[90px]'>
          <CartButton label='Очистить' small outline onClick={() => { handleCartClear() }} />
        </div>
        <div className='text-sm flex gap-1 flex-col items-start'>
          <div className='flex justify-between w-full text-base semibold'>
            <span>SubTotal</span>
            <span>1000 ₽</span>
          </div>
          <p className='text-slate-500'>Taxes and shipping at checkout</p>
          <CartButton label='Оформить покупку' onClick={() => {

          }} />
          <Link href={"/"} className='text-slate-500 flex items-center gap-1 mt-2' />
          <MdArrowBack />
          <span>Вернуться к покупкам</span>
        </div>
      </div>
    </div>
  )
}
