from typing import List

from fastapi import APIRouter, HTTPException
from tortoise.contrib.fastapi import HTTPNotFoundError
from tortoise.exceptions import DoesNotExist

import src.crud.category as crud
from src.schemas.categories import CategorySchema, UpdateCategory
from src.schemas.token import Status

router = APIRouter()


@router.get(
    "/categories",
    response_model=List[CategorySchema],
    summary="Все категории",
)
async def show_categories():
    return await crud.get_categories()


@router.get(
    "/category/{category_id}",
    response_model=CategorySchema,
    summary="Категории по ID",
)
async def get_single_category(category_id: int) -> CategorySchema:
    try:
        return await crud.get_category(category_id)
    except DoesNotExist:
        raise HTTPException(
            status_code=404,
            detail="Category does not exist",
        )


@router.post(
    "/category",
    response_model=CategorySchema,
    summary="Создать категорию",
)
async def add_category(category: CategorySchema) -> CategorySchema:
    return await crud.create_category(category)


@router.patch(
    "/category/{category_id}",
    response_model=CategorySchema,
    responses={404: {"model": HTTPNotFoundError}},
    summary="Редактировать категорию",
)
async def update_category(
    category_id: int,
    category: UpdateCategory,
):
    return await crud.update_category(category_id, category)


@router.delete(
    "/category/{category_id}",
    response_model=Status,
    responses={404: {"model": HTTPNotFoundError}},
    summary="Удалить категорию",
)
async def delete_category(category_id: int):
    return await crud.delete_category(category_id)
