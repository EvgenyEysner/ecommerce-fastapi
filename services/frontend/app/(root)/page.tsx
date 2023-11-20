"use client"
import { Container } from "@/app/Container";
import { HomeBanner } from "@/app/components/banner/HomeBanner";
import { ProductCard } from "@/app/components/product/ProductCard";
import {useEffect, useState} from "react";
import useApiHelper from "@/api/Api";
import { useAppDispatch, useAppSelector } from "../store/types";
import { productsSlice } from "../store/reducers/ProductSlice";

export default function Home() {
  const api = useApiHelper();
  const [isLoading, setIsLoading] = useState(true)
  const products = useAppSelector(state => state.productsReducer.products)
  const dispatch = useAppDispatch()
  const {addAllProducts} = productsSlice.actions 
  
  const allProducts = () => {
    api.productsList().then(res => {
      dispatch(addAllProducts(res))
    }).catch(error => {
      console.log("Error: ", error)
    })
  }

  useEffect(() => {
    allProducts();
    setIsLoading(false)
  })

  return (
    <div className='p-8'>
      <Container>
        <div>
          <HomeBanner />
        </div>
        {!isLoading &&
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {products.map((product: any) => <ProductCard key={product.id} productId={product.id} />)}
          </div>
        }
      </Container>
    </div>
  )
}
