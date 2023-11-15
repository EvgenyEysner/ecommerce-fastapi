"use client"
import { Container } from "@/app/Container";
import { HomeBanner } from "@/app/components/banner/HomeBanner";
import { ProductCard } from "@/app/components/product/ProductCard";
import {useEffect, useState} from "react";
import useApiHelper from "@/api/Api";

export default function Home() {
  const api = useApiHelper();
  const [products, setProducts]: any = useState([]);
  const allProducts = () => {
    api.productsList().then(res => {
      setProducts(res)
    }).catch(error => {
      console.log("Error: ", error)
    })
  }

  useEffect(() => {
    allProducts();
  }, [])
  return (
    <div className='p-8'>
      <Container>
        <div>
          <HomeBanner />
        </div>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {products.map((product: any) => {
            return (
              <ProductCard key={product.id} products={products} />
            )
          })}
        </div>
      </Container>
    </div>
  )
}
