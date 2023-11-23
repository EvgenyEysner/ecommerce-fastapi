# from fastapi import HTTPException
# from tortoise.exceptions import DoesNotExist
import os

import aiofiles
from fastapi import UploadFile, File, Form, HTTPException

from src.database.models import Image, Product
from src.schemas.images import ImageSchema
from PIL import Image
import secrets

# from src.schemas.token import Status


async def get_images():
    return await ImageSchema.from_queryset(Image.all())


async def get_image(image_id) -> ImageSchema:
    return await ImageSchema.from_queryset_single(Image.get(id=image_id))


# async def create_image(image) -> ImageSchema:
#     image_dict = image.dict(exclude_unset=True).
#     image_obj = await Image.create(**image_dict)
#     return await ImageSchema.from_tortoise_orm(image_obj)


async def create_image(product_id: int, file: UploadFile = File(...)):
    print(file.content_type)
    _, ext = os.path.splitext(file.filename)
    content = await file.read()
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=406, detail="Only .jpeg or .png  files allowed")
    file_name = f"{secrets.token_hex(9)}{ext}"
    async with aiofiles.open(os.path.join("static/images", file_name), "wb") as f:
        await f.write(content)
    path_to_img = os.path.abspath(file_name)

    img = Image.open(file_name)
    img.save(file_name)

    product = await Product.get(id=product_id)
    await product.images.add(file_name)
    await product.save()

    file_url = "".join("127.0.0.1:5000", path_to_img)

    return file_url


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
