from pydantic import BaseModel
from tortoise.contrib.pydantic import pydantic_model_creator

from src.database.models import Product

ProductInSchema = pydantic_model_creator(
    Product, name="ProductIn", exclude_readonly=True
)

ProductOutSchema = pydantic_model_creator(
    Product,
    name="Product",
    exclude=(
        "modified_at",
        "ordered_by.user.password",
        "ordered_by.user.created_at",
        "ordered_by.user.modified_at",
        "product_reviews.owner.password",
        "product_reviews.owner.created_at",
        "product_reviews.owner.modified_at",
    ),
)


class UpdateProduct(BaseModel):
    quantity: int
    on_stock: bool
