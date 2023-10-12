from fastapi import HTTPException
from tortoise.exceptions import DoesNotExist

from src.database.models import Product
from src.schemas.products import ProductSchema
from src.schemas.token import Status


async def get_products():
    return await ProductSchema.from_queryset(Product.all())


async def get_product(product_id) -> ProductSchema:
    return await ProductSchema.from_queryset_single(Product.get(id=product_id))


async def create_product(product, current_user) -> ProductSchema:
    product_dict = product.dict(exclude_unset=True)
    product_dict["user_id"] = current_user.id
    product_obj = await product.create(**product_dict)
    return await ProductSchema.from_tortoise_orm(product_obj)


async def update_product(product_id, product, current_user) -> ProductSchema:
    try:
        db_product = await ProductSchema.from_queryset_single(product.get(id=product_id))
    except DoesNotExist:
        raise HTTPException(status_code=404, detail=f"Product {product_id} not found")

    if db_product.author.id == current_user.id:
        await product.filter(id=product_id).update(**product.dict(exclude_unset=True))
        return await ProductSchema.from_queryset_single(product.get(id=product_id))

    raise HTTPException(status_code=403, detail=f"Not authorized to update")


async def delete_product(product_id, current_user) -> Status:
    try:
        db_product = await ProductSchema.from_queryset_single(Product.get(id=product_id))
    except DoesNotExist:
        raise HTTPException(status_code=404, detail=f"Product {product_id} not found")

    if db_product.author.id == current_user.id:
        deleted_count = await Product.filter(id=product_id).delete()
        if not deleted_count:
            raise HTTPException(status_code=404, detail=f"Product {product_id} not found")
        return Status(message=f"Deleted product {product_id}")

    raise HTTPException(status_code=403, detail=f"Not authorized to delete")
