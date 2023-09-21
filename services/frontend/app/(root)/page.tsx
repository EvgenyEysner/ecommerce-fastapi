import {Container} from "@/app/Container";
import {HomeBanner} from "@/app/components/banner/HomeBanner";
import {products} from "@/utils/products";
import {ProductCard} from "@/app/components/product/ProductCard";

export default function Home() {
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
