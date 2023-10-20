from fastapi import HTTPException
from tortoise.exceptions import DoesNotExist

from src.database.models import Product
from src.schemas.products import ProductSchema
from src.schemas.token import Status


async def get_products():
    return await ProductSchema.from_queryset(Product.all())


async def get_product(product_id) -> ProductSchema:
    return await ProductSchema.from_queryset_single(Product.get(id=product_id))


async def create_product(product) -> ProductSchema:
    product_dict = product.dict(exclude_unset=True)
    product_obj = await Product.create(**product_dict)
    return await ProductSchema.from_tortoise_orm(product_obj)


async def update_product(product_id, product) -> ProductSchema:
    try:
        await ProductSchema.from_queryset_single(Product.get(id=product_id))
    except DoesNotExist:
        raise HTTPException(status_code=404, detail=f"Product {product_id} not found")
    await Product.filter(id=product_id).update(**product.dict(exclude_unset=True))

    return await ProductSchema.from_queryset_single(Product.get(id=product_id))


async def delete_product(product_id) -> Status:
    try:
        await ProductSchema.from_queryset_single(Product.get(id=product_id))
    except DoesNotExist:
        raise HTTPException(status_code=404, detail=f"Product {product_id} not found")

    deleted_count = await Product.filter(id=product_id).delete()
    if not deleted_count:
        raise HTTPException(status_code=404, detail=f"Product {product_id} not found")
    return Status(message=f"Deleted product {product_id}")
