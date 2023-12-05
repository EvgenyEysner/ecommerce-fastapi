import {NextPage} from "next";
import {connect} from 'react-redux';
import {addAllProducts} from "@/store/reducers/ProductsSlice";
import {AppState, wrapper} from "@/store/store";

import {Container} from "@/components/Container";
import {HomeBanner} from "@/components/HomeBanner";
import {ProductCard} from "@/components/ProductCard";
import {RootLayout} from "@/components/RootLayout";
import {IProduct} from "@/interfaces/product.interface";
// import useCart from '@/hooks/useCart';

export const getStaticProps = wrapper.getStaticProps((store) => async (ctx) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/products', {next: {revalidate: 300}});
    const products = await response.json();

    store.dispatch(addAllProducts(products))

    return {
      props: {products},
    };
  } catch (e) {
    console.log('Error: ', e);
    return {
      props: {products: []},
    };
  }
})

// interface ProductsListProps {
//   products: IProduct[];
// }

const Home: NextPage<any> = (props) => {
  // const dispatch = useAppDispatch()

  // console.log(useAppSelector(state => state));


  // useEffect(() => {
  //   const productsInCart = typeof window !== 'undefined' ? window.sessionStorage.getItem('productsInCart') : null;

  //   if (productsInCart) {
  //     const cartProducts: IProductCart[] = JSON.parse(productsInCart)
  //     dispatch(firstAddProductToCart(cartProducts))
  //   }
  // }, [])

  // useEffect(() => {
  //   console.log('index');
  //   if (!isCheckDB)
  //     summationProducts()
  // }, [])

  return (
    <RootLayout>
      <div className='p-8'>
        <Container>
          <div>
            <HomeBanner/>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {props.pageProps.products.map((product: IProduct) => <ProductCard key={product.id} id={product.id}/>)}
          </div>

        </Container>
      </div>
    </RootLayout>
  )
}

export default connect((state: AppState) => state)(Home);
// export default Home
