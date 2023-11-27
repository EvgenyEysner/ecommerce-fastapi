import { GetStaticProps } from "next";
import { useAppDispatch, useAppSelector } from "@/store/types";
import { addAllProducts, productsSlice } from "@/store/reducers/ProductsSlice";
import { Container } from "@/components/Container";
import { HomeBanner } from "@/components/HomeBanner";
import { ProductCard } from "@/components/ProductCard";
import { RootLayout } from "@/components/RootLayout";
import { IProduct } from "@/interfaces/product.interface";
import { wrapper } from "@/store/store";

interface ProductsListProps {
  products: IProduct[];
}

export default function Home({ products }: ProductsListProps) {  
  const dispatch = useAppDispatch()
  dispatch(addAllProducts(products))

  return (
    <RootLayout>
      <div className='p-8'>
        <Container>
          <div>
            <HomeBanner />
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {products.map((product) => <ProductCard key={product.id} id={product.id} />)}
          </div>
          
        </Container>
      </div>
    </RootLayout>
  ) 
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  try {
    const response = await fetch('http://localhost:5000/products', { next: {revalidate: 300} });
    const products = await response.json();
    
    // await store.dispatch(addAllProducts(products))
    // const s = useAppSelector(store => store)
    // console.log(products);
    // console.log(s);
    
    return {
      props: { products },
    };
  } catch (e) {
    console.log('Error: ', e);
    return {
      props: { products: [] },
    };
  }
})

// export const getStaticProps: GetStaticProps<ProductsListProps> = async () => {
//   try {
//     const response = await fetch('http://localhost:5000/products', { next: {revalidate: 300} });
//     const products = await response.json();
//     console.log(products);
    
//     // const {addAllProducts} = productsSlice.actions 
//     // store.dispatch(addAllProducts(products))
//     return {
//       props: { products },
//     };
//   } catch (e) {
//     console.log('Error: ', e);
//     return {
//       props: { products: [] },
//     };
//   }
// };
