import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import useCart from '@/hooks/useCart';
import { formatPrice } from '@/helpers/formatPrice';
import { truncateText } from '@/helpers/truncateText';
import { IProductCart } from '@/interfaces/product.interface';

interface ItemContentProps {
  item: IProductCart
}

export const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const { deleteOneProductInCart, decreaseProduct, increaseProduct } = useCart()

  return (
    <div className='grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center'>
      <div className='col-span-2 justify-self-start flex gap-2 md:gap-4'>
        <Link href={`/product/${item.id}`}>
          <div className='relative w-[70px] aspect-square'>
            <Image src={item.images[0]?.src} alt={item.name} className='object-contain' width={100} height={100} />
          </div>
        </Link>
        <div className='flex flex-col justify-between'>
          <Link href={`/product/${item.id}`}>
            {truncateText(item.name)}
          </Link>
          {/* <div>{item.selectedImg.color}</div> */}
          <div className='w-[70px]'>
            <button className='text-slate-500 underline' onClick={() => {
              deleteOneProductInCart(item.id)
            }}>
              Удалить
            </button>
          </div>
        </div>
      </div>
      <div className='justify-self-center'>{formatPrice(item.price)}</div>
      <div className='justify-self-center'>
        <div className='flex gap-8 items-center'>
          <div className='font-semibold'>
            Кол-во:
          </div>
          <div className='flex gap-4 items-center text-base'>
            <button 
              onClick={() => {
                if (item.quantity > 1) {
                  decreaseProduct(item.id)
                } else {
                  toast.error('Это минимум ...')
                }
              }} 
              className={'border-[1.2px] border-slate-300 p-2 rounded'}
            >
              -
            </button>
            <div>{item.quantity}</div>
            <button 
              onClick={() => {
                if (item.quantity < item.maxQuantity) {
                  increaseProduct(item.id)
                } else {
                  toast.error('Вы выбрали максимальное доступное количество этого товара')
                }
              }}  
              className={'border-[1.2px] border-slate-300 p-2 rounded'}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className='justify-self-end font-semibold'>
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  )
}
