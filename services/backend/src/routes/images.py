from typing import List

from fastapi import APIRouter, HTTPException

# from tortoise.contrib.fastapi import HTTPNotFoundError
from tortoise.exceptions import DoesNotExist

import src.crud.image as crud
from src.schemas.images import ImageSchema

# from fastapi.responses import FileResponse
# from pathlib import Path


router = APIRouter()


@router.get(
    "/images",
    response_model=List[ImageSchema],
)
async def show_images():
    return await crud.get_images()


@router.get("/image/{image_id}", response_model=ImageSchema)
async def get_image(image_id: int) -> ImageSchema:
    try:
        return await crud.get_image(image_id)
    except DoesNotExist:
        raise HTTPException(
            status_code=404,
            detail="review does not exist",
        )


@router.post("/image", response_model=ImageSchema)
async def create_image(review: ImageSchema) -> ImageSchema:
    return await crud.create_image(review)
