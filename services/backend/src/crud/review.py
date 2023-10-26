from fastapi import HTTPException
from tortoise.exceptions import DoesNotExist

from src.database.models import Review
from src.schemas.reviews import ReviewSchema
from src.schemas.token import Status


async def get_reviews():
    return await ReviewSchema.from_queryset(Review.all())


async def get_review(review_id) -> ReviewSchema:
    return await ReviewSchema.from_queryset_single(Review.get(id=review_id))


async def create_review(review) -> ReviewSchema:
    review_dict = review.dict(exclude_unset=True)
    review_obj = await Review.create(**review_dict)
    return await ReviewSchema.from_tortoise_orm(review_obj)


async def update_review(review_id, review) -> ReviewSchema:
    try:
        await ReviewSchema.from_queryset_single(Review.get(id=review_id))
    except DoesNotExist:
        raise HTTPException(status_code=404, detail=f"Review {review_id} not found")
    await Review.filter(id=review_id).update(**review.dict(exclude_unset=True))

    return await ReviewSchema.from_queryset_single(Review.get(id=review_id))


# async def delete_review(review_id) -> Status:
#     try:
#         await ReviewSchema.from_queryset_single(Review.get(id=review_id))
#     except DoesNotExist:
#         raise HTTPException(status_code=404, detail=f"Review {review_id} not found")
#
#     deleted_count = await Review.filter(id=review_id).delete()
#     if not deleted_count:
#         raise HTTPException(status_code=404, detail=f"Review {review_id} not found")
#     return Status(message=f"Deleted review {review_id}")
