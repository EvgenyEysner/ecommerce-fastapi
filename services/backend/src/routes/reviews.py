from typing import List

from fastapi import APIRouter, HTTPException
from tortoise.contrib.fastapi import HTTPNotFoundError
from tortoise.exceptions import DoesNotExist

import src.crud.review as crud
from src.schemas.reviews import ReviewSchema, UpdateReview
from src.schemas.token import Status

router = APIRouter()


@router.get(
    "/reviews",
    response_model=List[ReviewSchema],
)
async def show_products():
    return await crud.get_reviews()


@router.get("/review/{review_id}", response_model=ReviewSchema)
async def get_single_review(review_id: int) -> ReviewSchema:
    try:
        return await crud.get_review(review_id)
    except DoesNotExist:
        raise HTTPException(
            status_code=404,
            detail="review does not exist",
        )


@router.post("/review", response_model=ReviewSchema)
async def create_reviews(review: ReviewSchema) -> ReviewSchema:
    return await crud.create_review(review)


@router.patch(
    "/review/{review_id}",
    response_model=ReviewSchema,
    responses={404: {"model": HTTPNotFoundError}},
)
async def update_product(
    review_id: int,
    review: UpdateReview,
):
    return await crud.update_review(review_id, review)


@router.delete(
    "/review/{review_id}",
    response_model=Status,
    responses={404: {"model": HTTPNotFoundError}},
)
async def delete_order(review_id: int):
    return await crud.delete_product(review_id)
