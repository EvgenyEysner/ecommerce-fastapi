'use client'

import { ItemContentProps } from '@/types';
import { formatPrice } from '@/utils/formatPrice';
import { truncateText } from '@/utils/truncateText';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SetQuantity } from '../components/product/SetQuantity';

export const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  return (
    <div className='grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center'>
      <div className='col-span-2 justify-self-start flex gap-2 md:gap-4'>
        <Link href={`/product/${item.id}`}>
          <div className='relative w-[70px] aspect-square'>
            <Image src={item.selectedImg.image} alt={item.name} className='object-contain' width={100} height={100} />
          </div>
        </Link>
        <div className='flex flex-col justify-between'>
          <Link href={`/product/${item.id}`}>
            {truncateText(item.name)}
          </Link>
          <div>{item.selectedImg.color}</div>
          <div className='w-[70px]'>
            <button className='text-slate-500 underline' onClick={() => {

            }}>
              Удалить
            </button>
          </div>
        </div>
      </div>
      <div className='justify-self-center'>{formatPrice(item.price)}</div>
      <div className='justify-self-center'>
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQtyDecrease={() => { }}
          handleQtyIncrease={() => { }}
        />
      </div>
      <div className='justify-self-end font-semibold'>
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  )
}
