import { Heading } from "@/app/components/product/Heading"
import { ListRatingProps } from "@/types"
import React from "react"
import moment from "moment"
import { Rating } from "@mui/material"
import { Avatar } from "@/app/components/product/Avatar"

export const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  return (
    <div>
      <Heading title="Отзывы" />
      <div className='text-sm'>
        {product.reviews && product.reviews.map((review: any) => {
          return (
            <div key={review.id} className='max-w-[300px]'>
              <div className='flex gap-2 items-center'>
                <Avatar src={review.user.image.image} />
                <div className='font-semibold'>{review?.user.name}</div>
                <div className='font-light'>{moment(review.createdDate).fromNow()}</div>
              </div>
              <div className='mt-2'>
                <Rating value={review.rating} readOnly />
                <div className='ml-2'>{review.comment}</div>
                <hr className='mt-4 mb-4' />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
