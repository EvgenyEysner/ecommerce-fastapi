import React from "react"
import moment from "moment"
import { Rating } from "@mui/material"
import { IProduct } from "@/interfaces/product.interface"
import { Heading } from "./Heading"
import { Avatar } from "../Avatar"

interface ListRatingProps {
  product: IProduct
}

export const ListRating: React.FC<ListRatingProps> = ({ product }) => {  
  return (
    <div>
      <Heading title="Отзывы" />
      <div className='text-sm'>
        {product.product_reviews && product.product_reviews.map((review) => {
          return (
            <div key={review.id} className='max-w-[300px]'>
              <div className='flex gap-2 items-center'>
                {/* подставить даные, когда это будет готово */}
                <Avatar src={null} />
                {/* <div className='font-semibold'>{review.owner.username}</div> */}
                <div className='font-light'>{moment(review.owner.created_at).fromNow()}</div>
              </div>
              <div className='mt-2'>
                <Rating value={review.rating} readOnly />
                <div className='ml-2'>{review.text}</div>
                <hr className='mt-4 mb-4' />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
