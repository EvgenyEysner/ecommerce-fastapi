"use client"
import {Container} from "@/app/Container"
import {IParams, ProductCardProps} from "@/types"
import {ProductDetails} from "../ProductDetails"
import {ListRating} from "./ListRating";
import {useEffect, useState} from "react";
import useApiHelper from "@/api/Api";

const Product = ({params}: { params: IParams }) => {
  const [product, setProduct]: any = useState({});
  const api = useApiHelper();
  const allProducts: any = (params) => {
    api.productDetails(params.productId).then(res => {
      const data = {
        "id": res.id,
        "name": res.name,
        "description": res.description,
        "category": res.category.name,
        "brand": res.brand,
        // "selectedImg": { ...res.images[0] },
        "on_stock": res.on_stock,
        "quantity": res.quantity,
        "price": res.price,
        "product_reviews": res.product_reviews
      }
      setProduct(data)
    }).catch(error => {
      console.log("Error: ", error)
    })
  }

  useEffect(() => {
    allProducts(params);
  }, [params.productId])

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product}/>
      </Container>
      <div className='flex flex-col mt-20 gap-4'>
        <ListRating product={product} />
      </div>
    </div>
  )
}
export default Product
