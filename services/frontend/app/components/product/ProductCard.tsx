'use client'
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {truncateText} from "@/utils/truncateText";
import {formatPrice} from "@/utils/formatPrice";
import {Rating} from "@mui/material";
import {useRouter} from "next/navigation";
import {ProductCardProps} from "@/types"
import { useAppSelector } from "@/app/store/types";

export const ProductCard: React.FC<ProductCardProps> = ({productId}) => {
  const [rating, setRating] = useState(0)
  const router = useRouter()

  const product = useAppSelector(state => state.productsReducer.products.find(el => el.id === productId))

  useEffect(() => {
    if (product.product_reviews) {
      const productRating = product.product_reviews.reduce(
        (accumulator: number, item: any) => item.rating + accumulator,
        0
      ) / product.product_reviews.length;
      setRating(productRating);
    }
  }, []);

  return (
      <div key={product?.id}
           onClick={() => router.push(`/product/${product.id}`)}
           className='
      col-span-1
      cursor-pointer border-[1.2px]
      border-slate-200
      bg-slate-50
      rounded-sm p-2
      transition
      hover:scale-105
      text-center
      text-sm
      '>
        <div className='flex flex-col items-center w-full gap-1'>
          <div className='aspect-square overflow-hidden relative w-full'>
            <Image
              src={product.images.src}
              alt={product.name}
              fill
              className='object-contain'
            />
          </div>
          <div>
            {truncateText(product.name)}
          </div>
          <div>
            <Rating value={rating} readOnly/>
          </div>
          <div>{product?.product_reviews.length} Отзывов</div>
          <div className='font-semibold'>{formatPrice(product.price)}</div>
        </div>
      </div>
  )
}
