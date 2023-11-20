"use client"
import {Container} from "@/app/Container"
import {IProductParams, ProductCardProps} from "@/types"
import {ProductDetails} from "../ProductDetails"
import {ListRating} from "./ListRating";
import {useEffect, useState} from "react";
import useApiHelper from "@/api/Api";
import { useAppDispatch, useAppSelector } from "@/app/store/types";
import { productsSlice } from "@/app/store/reducers/ProductSlice";

const Product = ({params}: { params: IProductParams }) => {
  // const [product, setProduct]: any = useState({});
  const [isLoading, setIsLoading] = useState(true)
  const { product } = useAppSelector(state => state.productsReducer)
  const api = useApiHelper();
  const { addProduct } = productsSlice.actions
  const dispatch = useAppDispatch()  

  const allProducts = (params: IProductParams): void => {
    if (params.productId) {
      api.productDetails(params.productId).then((res: any) => {
        const data = {
          id: res.id,
          name: res.name,
          description: res.description,
          category: res.category.name,
          brand: res.brand,
          // "selectedImg": { ...res.images[0] },
          on_stock: res.on_stock,
          quantity: res.quantity,
          price: res.price,
          product_reviews: res.product_reviews
        }
        dispatch(addProduct(res))
      }).catch(error => {
        console.log("Error: ", error)
      })
    }
  }
  

  useEffect(() => {
    allProducts(params);
    setIsLoading(false)
  }, [params.productId])

  if (isLoading) return <></>

  return (
    <div className="p-8">
      <Container>
        <ProductDetails />
      </Container>
      <div className='flex flex-col mt-20 gap-4'>
        <ListRating />
      </div>
    </div>
  )
}
export default Product
