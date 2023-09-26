import { Container } from "@/app/Container"
import { IParams } from "@/types"
import { ProductDetails } from "../ProductDetails"
import { product } from "@/utils/product";
import { ListRating } from "./ListRating";


const Product = ({ params }: { params: IParams }) => {
  console.log(params)
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
