import { Container } from "@/app/Container"
import { IParams } from "@/types"
import { ProductDetails } from "../ProductDetails"
import { ListRating } from "./ListRating";
import { products } from "@/utils/products";


const Product = ({ params }: { params: IParams }) => {
  const product = products.find((item) => item.id === params.productId)

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
      </Container>
      <div className='flex flex-col mt-20 gap-4'>
        <div>RatingList</div>
        <ListRating product={product} />
      </div>
    </div>
  )
}

export default Product
