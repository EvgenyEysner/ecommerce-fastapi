import { CartClient } from "@/components/Cart/CartClient";
import { Container } from "@/components/Container";
import { RootLayout } from "@/components/RootLayout";
import { AppState, wrapper } from "@/store/store";
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

    if (user) 
      return {
        props: { isAuth: true },
      } as GetServerSidePropsResult<CartProps>;;

    return {
      props: { isAuth: false },
    } as GetServerSidePropsResult<CartProps>;;
  }
);

export default connect((state: AppState) => state)(Cart);
// export default Cart