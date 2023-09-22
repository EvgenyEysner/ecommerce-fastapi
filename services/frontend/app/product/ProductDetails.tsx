"use client"
import { CartProductType, ProductDetailsProps, SelectedImgType } from "@/types"
import React, { useCallback, useState } from "react";
import { Rating } from "@mui/material";
import { SetColor } from "@/app/components/product/SetColor";
import { SetQuantity } from "@/app/components/product/SetQuantity";


export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const productRating = product.reviews.reduce((accumulator: number, item: any) => item.rating + accumulator, 0)
    / product.reviews.length

  const [cartProduct, setCartProduct] = useState<CartProductType>(
    {
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      brand: product.brand,
      selectedImg: { ...product.images[0] },
      quantity: 1,
      price: product.price
    }
  )
  const Horizontal = () => {
    return (
      <hr className='w-[30%] my-2' />
    )
  }

  const handleQtyIncrease = useCallback(() => {
    setCartProduct((prev) => {
      return {
        ...prev, quantity: ++prev.quantity
      }
    })
  }, [])

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return
    }
    setCartProduct((prev) => {
      return {
        ...prev, quantity: --prev.quantity
      }
    })
  }, [cartProduct])

  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCartProduct(prev => {
      return { ...prev, selectedImg: value }
    })
  }, [cartProduct.selectedImg])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
      <div>Image</div>
      <div className='flex flex-col gap-1 text-slate-500 text-sm'>
        <h2 className='text-3xl font-medium text-slate-700'>{product.name}</h2>
        <Horizontal />
        <div>
          <Rating value={productRating} readOnly />
          <div className='flex items-center gap-2 '>{product.reviews.length} Отзывы</div>
        </div>
        <Horizontal />
        <div className='text-justify'>
          {product.description}
        </div>
        <Horizontal />
        <div>
          <span className='font-semibold'>Категория: </span>
          {product.category}
        </div>
        <div>
          <span className='font-semibold'>Brand: </span>
          {product.brand}
        </div>
        <div className={product.inStock ? 'text-teal-700' : 'text-rose-900'}>
          {product.inStock ? 'Есть в наличии' : 'Нет в наличии'}
        </div>
        <Horizontal />
        <SetColor
          cartProduct={cartProduct}
          images={product.images}
          handleColorSelect={handleColorSelect}
        />
        <Horizontal />
        <SetQuantity
          cartProduct={cartProduct}
          handleQtyIncrease={handleQtyIncrease}
          handleQtyDecrease={handleQtyDecrease}
        />
        <Horizontal />
        <div>Добавить в корзину</div>
      </div>
    </div>
  )
}
