# from fastapi import HTTPException
# from tortoise.exceptions import DoesNotExist

from src.database.models import Image
from src.schemas.images import ImageSchema

# from src.schemas.token import Status


async def get_images():
    return await ImageSchema.from_queryset(Image.all())


async def get_image(image_id) -> ImageSchema:
    return await ImageSchema.from_queryset_single(Image.get(id=image_id))


async def create_image(image) -> ImageSchema:
    image_dict = image.dict(exclude_unset=True)
    image_obj = await Image.create(**image_dict)
    return await ImageSchema.from_tortoise_orm(image_obj)


#
#
# async def update_review(review_id, review) -> ReviewSchema:
#     try:
#         await ReviewSchema.from_queryset_single(Review.get(id=review_id))
#     except DoesNotExist:
#         raise HTTPException(status_code=404, detail=f"Review {review_id} not found")
#     await Review.filter(id=review_id).update(**review.dict(exclude_unset=True))
#
#     return await ReviewSchema.from_queryset_single(Review.get(id=review_id))


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
