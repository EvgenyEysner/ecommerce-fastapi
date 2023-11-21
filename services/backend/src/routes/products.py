from typing import List

from fastapi import APIRouter, HTTPException
from tortoise.contrib.fastapi import HTTPNotFoundError
from tortoise.exceptions import DoesNotExist

import src.crud.products as crud
from src.schemas.products import ProductInSchema, UpdateProduct, ProductOutSchema
from src.schemas.token import Status

router = APIRouter()


@router.get("/products", response_model=List[ProductOutSchema], summary="Все продукты")
async def show_products():
    return await crud.get_products()


@router.get(
    "/products/{product_id}", response_model=ProductOutSchema, summary="Продукт по ID"
)
async def get_single_product(product_id: int) -> ProductOutSchema:
    try:
        return await crud.get_product(product_id)
    except DoesNotExist:
        raise HTTPException(
            status_code=404,
            detail="Product does not exist",
        )


@router.post("/product", response_model=ProductInSchema, summary="Создать продукт")
async def create_product(product: ProductInSchema) -> ProductInSchema:
    return await crud.create_product(product)


@router.patch(
    "/product/{product_id}",
    response_model=ProductInSchema,
    responses={404: {"model": HTTPNotFoundError}},
    summary="Редактировать продукт",
)
async def update_product(
    product_id: int,
    product: UpdateProduct,
):
    return await crud.update_product(product_id, product)


@router.delete(
    "/product/{product_id}",
    response_model=Status,
    responses={404: {"model": HTTPNotFoundError}},
    summary="Удалить продукт",
)
async def delete_product(product_id: int):
    return await crud.delete_product(product_id)
