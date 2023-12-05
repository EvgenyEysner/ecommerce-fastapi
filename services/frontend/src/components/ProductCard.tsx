import React, {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {Rating} from "@mui/material";
import {useAppSelector} from "@/store/types";
import {formatPrice} from "@/helpers/formatPrice";
import {truncateText} from "@/helpers/truncateText";

interface ProductCardProps {
  id: number
}

export const ProductCard: React.FC<ProductCardProps> = ({id}) => {
  const [rating, setRating] = useState(0)
  const product = useAppSelector(state => state.productReducer.products.find(el => el.id === id))

  useEffect(() => {
    if (product) {
      const productRating = product.product_reviews.reduce(
        (accumulator: number, item) => item.rating + accumulator,
        0
      ) / product.product_reviews.length;
      setRating(productRating);
    }
  }, [product]);

  return (
    <Link
      href={`/product/${product?.id}`}
      key={product?.id}
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
            src={product?.images[0]?.src || ''}
            alt={product?.name || ''}
            fill
            className='object-contain'
          />
        </div>
        <div>
          {truncateText(product?.name || '')}
        </div>
        <div>
          <Rating value={rating} readOnly/>
        </div>
        <div>{product?.product_reviews.length} Отзывов</div>
        <div className='font-semibold'>{formatPrice(product?.price || 0)}</div>
      </div>
    </Link>
  )
}
