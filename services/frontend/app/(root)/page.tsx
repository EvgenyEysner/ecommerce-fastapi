'use client'
import { Container } from "@/app/Container";
import { HomeBanner } from "@/app/components/banner/HomeBanner";
// import { products } from "@/utils/products";
import { ProductCard } from "@/app/components/product/ProductCard";
import { useState, useContext } from "react"
import { ProductCardProps } from "@/types";

export default async function Home() {
  const [products, setProducts] = useState()

  // async function getData() {
  //   const res = await fetch('http://127.0.0.1:5000/products')
  //   // The return value is *not* serialized
  //   // You can return Date, Map, Set, etc.

  //   if (!res.ok) {
  //     // This will activate the closest `error.js` Error Boundary
  //     throw new Error('Failed to fetch data')
  //   }
  //   const json = await res.json()
  //   setProducts(json)
  //   console.log('DATA', products)
  // }
  fetch('http://127.0.0.1:5000/products')
    .then(response => {
      return response.json()
    }).then(result => {
      setProducts(result)
      console.log('Products', products)
    })
  return (
    <div className='p-8'>
      <Container>
        <div>
          <HomeBanner />
        </div>
        {products && (
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {products.map((product: any) => {
              return (
                <ProductCard key={product.id} data={product} />
              )
            })}
          </div>
        )}
      </Container>
    </div>
  )
}

