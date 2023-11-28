import os
import secrets
from typing import List

import aiofiles
from fastapi import APIRouter, HTTPException, UploadFile, File, status
from tortoise.exceptions import DoesNotExist

import src.crud.image as crud
from src.database.models import Image, Product
from src.schemas.images import ImageSchema

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


@router.post("/upload_image/product/{product_id}")
async def create_image(product_id: int, file: UploadFile = File(...)) -> ImageSchema:
    _, ext = os.path.splitext(file.filename)
    content = await file.read()

    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=406, detail="Only .jpeg or .png  files allowed")
    file_name = f"{secrets.token_hex(5)}_{product_id}{ext}"
    file_path = os.path.join("static/images", file_name)
    async with aiofiles.open(file_path, "wb") as file:
        await file.write(content)
    product = await Product.get(id=product_id)
    path_to_img = "http://127.0.0.1:5000/" + file_path

    image_dict = {"name": file_name, "src": path_to_img, "product": product}
    image = await Image(**image_dict)
    await image.save()

    return {"Status": status.HTTP_201_CREATED, "URL": path_to_img}
