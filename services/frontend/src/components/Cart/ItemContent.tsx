import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import useCart from '@/hooks/useCart';
import { formatPrice } from '@/helpers/formatPrice';
import { truncateText } from '@/helpers/truncateText';
import { IProduct } from '@/interfaces/product.interface';
import { useAppDispatch, useAppSelector } from '@/store/types';
import { addProductToCart, deleteProduct } from '@/store/reducers/CartSlice';

interface ItemContentProps {
  item: IProduct
}

export const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const dispatch = useAppDispatch()
  const { deleteOneProductInCart, decreaseProduct, increaseProduct } = useCart()
  const products = useAppSelector(store => store.productReducer.products)
  const product = products.find(el => el.id === item.id)

  useEffect(() => {
    if (product && item.quantity > product.quantity) {
      const newProduct: IProduct = { ...item, quantity: product.quantity }
      dispatch(deleteProduct(item.id))
      dispatch(addProductToCart(newProduct))
    }
  }, [item, product])

  if (!product || !product.on_stock || product.quantity === 0)
    return (
      <div className='grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center bg-red-100'>
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
              <button className='text-red-500 underline' onClick={() => {
                deleteOneProductInCart(item.id)
              }}>
                Удалить
              </button>
            </div>
          </div>
        </div>
        <div className='justify-self-center'>{formatPrice(item.price)}</div>
        <div className='justify-self-center'>
          <div className='flex gap-8 items-center font-semibold text-red-500'>Товар закончился</div>
        </div>
        <div className='justify-self-end font-semibold text-red-500'>
          {formatPrice(item.price * item.quantity)}
        </div>
      </div>
    )

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
                if (item.quantity < product.quantity) {
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
