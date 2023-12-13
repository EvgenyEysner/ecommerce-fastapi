import {Container} from "@/components/Container";
import {ListRating} from "@/components/Product/ListRating";
import {ProductDetails} from "@/components/Product/ProductDetails";
import {RootLayout} from "@/components/RootLayout";
import {IProduct} from "@/interfaces/product.interface";
import Head from "next/head";
import {GetStaticPaths, GetStaticProps} from "next";

export default function Product({pageProps}: { pageProps: any }) {
  const product: IProduct = pageProps.product
  const title = `Online-Shop | ${product.name}`

  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta
          name="keywords"
          content={`магазин, онлайн, техника, ${product.name}, ${product.brand}, ${product.description}`}
        />
        <title>{title}</title>
      </Head>
      <RootLayout>
        <div className="p-8">
          <Container>
            <ProductDetails product={product}/>
          </Container>
          <div className='flex flex-col mt-20 gap-4'>
            <ListRating product={product}/>
          </div>
        </div>
      </RootLayout>
    </>

  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://127.0.0.1:5000/products');
  const products: IProduct[] = await res.json();

  const paths = products.map((product) => {
    return {
      params: {id: product.id.toString()},
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/products/${params?.id}`, {next: {revalidate: 30}});
    const product = await response.json();

    if (!!product.detail) throw new Error()

    return {
      props: {product},
    };
  } catch (e) {
    console.log('Error: ', e);
    return {
      notFound: true
    };
  }
};
