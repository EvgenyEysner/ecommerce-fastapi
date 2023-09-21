'use client'

import { ProductCardProps } from "@/types";
import React from "react";
import Image from "next/image";
import { truncateText } from "@/utils/truncateText";
import { formatPrice } from "@/utils/formatPrice";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";

export const ProductCard: React.FC<ProductCardProps> = (data) => {
  const router = useRouter()
  const productRating = data.data.reviews.reduce((accumulator: number, item: any) => item.rating + accumulator, 0)
    / data.data.reviews.length
  return (
    <div
      onClick={() => router.push(`/product/${data.data.id}`)}
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
            src={data.data.images[0].image}
            alt=''
            fill
            className='w-full h-full'
          />
        </div>
        <div>
          {truncateText(data.data.name)}
        </div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{data.data.reviews.length} Отзывов</div>
        <div className='font-semibold'>{formatPrice(data.data.price)}</div>
      </div>
    </div>
  )
}
