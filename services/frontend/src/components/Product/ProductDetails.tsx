import {useEffect, useState} from "react";
import {Rating} from "@mui/material";
// import { SetColor } from "@/app/components/product/SetColor";
// import { ProductImage } from "@/app/components/product/ProductImage";
import {MdCheckCircle} from "react-icons/md";
import {useRouter} from "next/router";
import {Horizontal} from "@/UI/Horizontal";
import {CartButton} from "@/UI/CartButton";
import useCart from "@/hooks/useCart";
import toast from "react-hot-toast";
import {IProduct, IProductCart} from "@/interfaces/product.interface";
import {useAppSelector} from "@/store/types";

interface ProductDetailsProps {
  product: IProduct
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({product}) => {
  const router = useRouter()
  const {addProductToCart, isProductInCart} = useCart()

  const rating = product.product_reviews.reduce((accumulator: number, item: any) => item.rating + accumulator, 0)
    / product?.product_reviews?.length
  const [cartCounter, setCartCounter] = useState(1)
  const cart = useAppSelector(state => state.cartReducer.products)
  const [productInCart, setProductInCart] = useState(isProductInCart(product.id))

  useEffect(() => {
    setProductInCart(isProductInCart(product.id))
  }, [cart])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
      {/*<ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect} />*/}
      <div className='flex flex-col gap-1 text-slate-500 text-sm'>
        <h2 className='text-3xl font-medium text-slate-700'>{product.name}</h2>
        <Horizontal/>
        <div>
          <Rating value={rating} readOnly/>
          <div className='flex items-center gap-2 '>{product.product_reviews.length} Отзывы</div>
        </div>
        <Horizontal/>
        <div className='text-justify'>
          {product.description}
        </div>
        <Horizontal/>
        <div>
          <span className='font-semibold'>Категория: </span>
          {product.category.name}
        </div>
        <div>
          <span className='font-semibold'>Brand: </span>
          {product.brand}
        </div>
        <div className={product?.on_stock ? 'text-teal-700' : 'text-rose-900'}>
          {product?.on_stock ? 'Есть в наличии' : 'Нет в наличии'}
        </div>
        <Horizontal/>
        {productInCart ?
          <>
            <p className='mb-2 text-slate-500 flex items-center gap-1'>
              <MdCheckCircle size={20} className='text-teal-400'/>
              <span>Добавлен в корзину</span>
            </p>
            <div className='max-w-[300px]'>
              <CartButton label='Перейти в корзину' outline onClick={() => {
                router.push('/cart')
              }}/>
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
                    toast.error('Это минимум ...')
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
                    toast.error('Это максимум ...')
                    return prev
                  })}
                  className='border-[1.2px] border-slate-300 p-2 rounded'
                >
                  +
                </button>
              </div>
            </div>
            <Horizontal/>
            <div className='max-w-[300px]'>
              <CartButton
                label={"Добавить в корзину"}
                onClick={() => {
                  setProductInCart(true)
                  const productCart: IProductCart = {
                    ...product,
                    quantity: cartCounter,
                    maxQuantity: product.quantity
                  }
                  addProductToCart(productCart)
                  toast.success(product.name + ' добавлен в корзину')
                  // postOrder(productCart)
                }}
              />
            </div>
          </>}
      </div>
    </div>
  )
}
