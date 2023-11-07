'use client'

import { ProductCardProps } from "@/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { truncateText } from "@/utils/truncateText";
import { formatPrice } from "@/utils/formatPrice";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import useApiHelper from "@/api/Api";

export const ProductCard: any = () => {
  const api = useApiHelper();
  const [products, setProducts]: any = useState([]);

  let data_reviews = products.map((product: any) => {
    console.log('DATA', product.product_reviews)
  })
  const Allproducts = () => {
    api.productsList().then(res => {
      console.log('Product', res)
      setProducts(res)
    })
  }

  useEffect(() => {
    Allproducts();
  }, [])
  const router = useRouter()

  // const productRating = data_reviews.reduce((accumulator: number, item: any) => item.rating + accumulator, 0)
  //   / data_reviews.length
  return (<>
    {products.map((product: any) => (
      <div key={product.id}
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
              src={product.src}
              alt={product.name}
              fill
              className='object-contain'
            />
          </div>
          <div>
            {truncateText(product.name)}
          </div>
          {/*<div>*/}
          {/*  <Rating value={productRating} readOnly />*/}
          {/*</div>*/}
          <div>{product.product_reviews.length} Отзывов</div>
          <div className='font-semibold'>{formatPrice(product.price)}</div>
        </div>
      </div>
    ))}
  </>)
}
