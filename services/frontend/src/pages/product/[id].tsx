import { Container } from "@/components/Container";
import { ListRating } from "@/components/Product/ListRating";
import { ProductDetails } from "@/components/Product/ProductDetails";
import { RootLayout } from "@/components/RootLayout";
import { IProduct } from "@/interfaces/product.interface";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";

interface ProductParams {
  product: IProduct
}

export default function Product({product}: ProductParams) { 

  if ('detail' in product)
    return <>Product is not found</>

  return (
    <RootLayout>
      <div className="p-8">
        <Container>
          <ProductDetails product={product} />
        </Container>
        <div className='flex flex-col mt-20 gap-4'>
          <ListRating product={product} />
        </div>
      </div>
    </RootLayout>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch('http://localhost:5000/products');
//   const products: IProduct[] = await res.json();

//   const paths = products.map((product) => {
//     return {
//       params: { id: product.id.toString() },
//     };
//   });

//   return {
//     paths,
//     fallback: true,
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {  
//   try {
//     const response = await fetch(`http://localhost:5000/products/${params?.id}`, {next: {revalidate: 300}});
//     const product = await response.json();
//     return {
//       props: { product },
//     };
//   } catch (e) {
//     console.log('Error: ', e);
//     return {
//       notFound: true      
//     };
//   }
// };

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const response = await fetch(`http://localhost:5000/products/${params?.id}`, {next: {revalidate: 300}});
    const product = await response.json();
    return {
      props: { product },
    };
  } catch (e) {
    console.log('Error: ', e);
    return {
      notFound: true      
    };
  }
}