"use client"
import { CartProductType, ProductDetailsProps, SelectedImgType } from "@/types"
import React, { useCallback, useState, useEffect } from "react";
import { Rating } from "@mui/material";
import { SetColor } from "@/app/components/product/SetColor";
import { CartButton } from "../components/button/CartButton";
import { ProductImage } from "@/app/components/product/ProductImage";
import { useCart } from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Horizontal } from "../components/line/Horizontal";
import { useAppSelector } from "../store/types";


export const ProductDetails: React.FC = () => {
  const router = useRouter()

  const product = useAppSelector(state => state.productsReducer.product) 
   
  const productRating = product?.product_reviews?.reduce((accumulator: number, item: any) => item.rating + accumulator, 0)
    / product?.product_reviews?.length
  const { handleAddProductToCart, cartProducts } = useCart()
  
  const [isProductInCart, setProductToCart] = useState(false)
  const [cartCounter, setCartCounter] = useState(1)

  useEffect(() => {
    let foundProductInCart = false;

    cartProducts?.forEach((element: any) => {
      if (element.id === product?.id) {
        foundProductInCart = true;
      }
    });

    setProductToCart(foundProductInCart);
  }, [cartProducts, product])


  // const handleColorSelect = useCallback((value: SelectedImgType) => {
  //   setCartProduct(prev => {
  //     return { ...prev, selectedImg: value }
  //   })
  // }, [cartProduct.selectedImg])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
      {/*<ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect} />*/}
      <div className='flex flex-col gap-1 text-slate-500 text-sm'>
        <h2 className='text-3xl font-medium text-slate-700'>{product?.name}</h2>
        <Horizontal />
        <div>
          <Rating value={productRating} readOnly />
          <div className='flex items-center gap-2 '>{product?.product_reviews?.length} Отзывы</div>
        </div>
        <Horizontal />
        <div className='text-justify'>
          {product?.description}
        </div>
        <Horizontal />
        <div>
          <span className='font-semibold'>Категория: </span>
          {product?.category?.name}
        </div>
        <div>
          <span className='font-semibold'>Brand: </span>
          {product?.brand}
        </div>
        <div className={product?.on_stock ? 'text-teal-700' : 'text-rose-900'}>
          {product?.on_stock ? 'Есть в наличии' : 'Нет в наличии'}
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
            {/* <SetColor*/}
            {/*  cartProduct={cartProduct}*/}
            {/*  images={product.images}*/}
            {/*  handleColorSelect={handleColorSelect}*/}
            {/*/>*/}
            {/*<Horizontal /> */}
            <div className='flex gap-8 items-center'>
              <div className='font-semibold'>
                Кол-во:
              </div>
              <div className='flex gap-4 items-center text-base'>
                <button 
                  onClick={() => setCartCounter(prev => {
                    if (prev > 1) {
                      return --prev
                    }
                    return prev
                  })} 
                  className='border-[1.2px] border-slate-300 p-2 rounded'
                >
                  -
                </button>
                <div>{cartCounter}</div>
                <button 
                  onClick={() => setCartCounter(prev => {
                    if (prev < product.quantity) {
                      return ++prev
                    }
                    return prev
                  })} 
                  className='border-[1.2px] border-slate-300 p-2 rounded'
                >
                  +
                </button>
              </div>
            </div>
            <Horizontal />
            <div className='max-w-[300px]'>
              <CartButton
                label={"Добавить в корзину"}
                onClick={() => handleAddProductToCart({...product, quantity: cartCounter})}
              />
            </div>
          </>}
      </div>
    </div>
  )
}
