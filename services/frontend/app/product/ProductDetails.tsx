"use client"
import { CartProductType, ProductDetailsProps, SelectedImgType } from "@/types"
import React, { useCallback, useState, useEffect } from "react";
import { Rating } from "@mui/material";
import { SetColor } from "@/app/components/product/SetColor";
import { SetQuantity } from "@/app/components/product/SetQuantity";
import { CartButton } from "../components/button/CartButton";
import { ProductImage } from "@/app/components/product/ProductImage";
import { useCart } from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";


export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const productRating = product.reviews.reduce((accumulator: number, item: any) => item.rating + accumulator, 0)
    / product.reviews.length
  const { handleAddProductToCart, cartProducts } = useCart()
  const [isProductInCart, setProductToCart] = useState(false)
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

  const router = useRouter()

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


  useEffect(() => {
    setProductToCart(false)
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex((item) => item.id === product.id)

      if (existingIndex > -1) {
        setProductToCart(true)
      }
    }
  }, [cartProducts])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
      <ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect} />
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
        {isProductInCart ?
          <>
            <p className='mb-2 text-slate-500 flex items-center gap-1'>
              <MdCheckCircle size={20} className='text-teal-400' />
              <span>Добавлен в корзину</span>
            </p>
            <div className='max-w-[300px]'>
              <CartButton label='Перейти в корзину' outline onClick={() => {
                router.push('/cart')
              }} />
            </div>
          </> :
          <>
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
            <div className='max-w-[300px]'>
              <CartButton
                label={"Добавить в корзину"}
                onClick={() => handleAddProductToCart(cartProduct)}
              />
            </div>
          </>}
      </div>
    </div>
  )
}
