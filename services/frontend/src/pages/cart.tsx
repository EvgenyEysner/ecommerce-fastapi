import { CartClient } from "@/components/Cart/CartClient";
import { Container } from "@/components/Container";
import { RootLayout } from "@/components/RootLayout";

export default function Cart () {
  return (
    <RootLayout>
      <div className='pt-8'>
        <Container>
          <CartClient />
        </Container>
      </div>
    </RootLayout>
  )
}