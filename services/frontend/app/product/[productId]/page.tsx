import { Container } from "@/app/Container"
import { IParams } from "@/types"
import { ProductDetails } from "../ProductDetails"
import {product} from "@/utils/product";


const Product = ({ params }: { params: IParams }) => {
  console.log(params)
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product}/>
      </Container>
    </div>
  )
}

export default Product
