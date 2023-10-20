from fastapi import HTTPException
from tortoise.exceptions import DoesNotExist

from src.database.models import Category
from src.schemas.categories import CategorySchema
from src.schemas.token import Status


async def get_categories():
    return await CategorySchema.from_queryset(Category.all())


async def get_category(category_id) -> CategorySchema:
    return await CategorySchema.from_queryset_single(Category.get(id=category_id))


async def create_category(category) -> CategorySchema:
    category_dict = category.dict(exclude_unset=True)
    category_obj = await Category.create(**category_dict)
    return await CategorySchema.from_tortoise_orm(category_obj)


async def update_category(category_id, category) -> CategorySchema:
    try:
        await CategorySchema.from_queryset_single(Category.get(id=category_id))
    except DoesNotExist:
        raise HTTPException(status_code=404, detail=f"Category {category_id} not found")
    await Category.filter(id=category_id).update(**category.dict(exclude_unset=True))

    return await CategorySchema.from_queryset_single(Category.get(id=category_id))


async def delete_category(category_id) -> Status:
    try:
        await CategorySchema.from_queryset_single(Category.get(id=category_id))
    except DoesNotExist:
        raise HTTPException(status_code=404, detail=f"Category {category_id} not found")

    return Status(message=f"Deleted Category {category_id}")
