import {Container} from "@/app/Container";
import {HomeBanner} from "@/app/components/banner/HomeBanner";
import {products} from "@/utils/products";
import {ProductCard} from "@/app/components/product/ProductCard";

// async function getData() {
//   const res = await fetch('http://0.0.0.0:5000/products')
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.
//
//   console.log(res.json())
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }
//
//   return res.json()
// }

export default async function Home() {
  // const data = await getData()

  return (
    <div className='p-8'>
      <Container>
        <div>
          <HomeBanner/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {products.map((product: any) => {
            return (
              <ProductCard key={product.id} data={product} />
            )
          })}
        </div>
      </Container>
    </div>
  )
}
