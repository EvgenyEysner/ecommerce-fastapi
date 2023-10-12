from typing import List

from fastapi import APIRouter, Depends, HTTPException
from tortoise.contrib.fastapi import HTTPNotFoundError
from tortoise.exceptions import DoesNotExist

import src.crud.products as crud
from src.auth.jwthandler import get_current_user
from src.schemas.products import ProductSchema
from src.schemas.token import Status
from src.schemas.users import UserOutSchema

router = APIRouter()


@router.get(
    "/products",
    response_model=List[ProductSchema],
)
async def show_products():
    return await crud.get_products()


@router.get("/product/{product_id}", response_model=ProductSchema)
async def get_single_product(product_id: int) -> ProductSchema:
    try:
        return await crud.get_product(product_id)
    except DoesNotExist:
        raise HTTPException(
            status_code=404,
            detail="Product does not exist",
        )


@router.post("/product", response_model=ProductSchema, dependencies=[Depends(get_current_user)])
async def create_product(
        product: ProductSchema, current_user: UserOutSchema = Depends(get_current_user)
) -> ProductSchema:
    return await crud.create_product(product, current_user)


@router.patch(
    "/product/{product_id}",
    dependencies=[Depends(get_current_user)],
    response_model=ProductSchema,
    responses={404: {"model": HTTPNotFoundError}},
)
async def update_product(
        product_id: int,
        current_user: UserOutSchema = Depends(get_current_user),
) -> ProductSchema:
    return await crud.update_product(product_id, current_user)


@router.delete(
    "/product/{product_id}",
    response_model=Status,
    responses={404: {"model": HTTPNotFoundError}},
    dependencies=[Depends(get_current_user)],
)
async def delete_order(
        product_id: int, current_user: UserOutSchema = Depends(get_current_user)
):
    return await crud.delete_product(product_id, current_user)
