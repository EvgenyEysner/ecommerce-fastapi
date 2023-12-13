import { CartClient } from "@/components/Cart/CartClient";
import { Container } from "@/components/Container";
import { RootLayout } from "@/components/RootLayout";
import { addAllProducts } from "@/store/reducers/ProductsSlice";
import { AppState, wrapper } from "@/store/store";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { connect } from "react-redux";

interface CartProps {
  isAuth: boolean;
}

const Cart =  ({ pageProps }: { pageProps: any }) => {  
  return (
    <RootLayout>
      <div className='pt-8'>
        <Container>
          <CartClient isAuth={pageProps.isAuth} />
        </Container>
      </div>
    </RootLayout>
  )
}

export const getServerSideProps: GetServerSideProps<CartProps> = wrapper.getServerSideProps(
  (store) => async () => { 
    const user = store.getState().userReducer.user   
    const products = store.getState().productReducer.products

    if (products.length === 0) {
      const response = await fetch('http://localhost:5000/products', { next: {revalidate: 300} });
      const products = await response.json();
      
      store.dispatch(addAllProducts(products))
    }

    return {
      props: { isAuth: !!user },
    } as GetServerSidePropsResult<CartProps>;;
  }
);

export default connect((state: AppState) => state)(Cart);
// export default Cart