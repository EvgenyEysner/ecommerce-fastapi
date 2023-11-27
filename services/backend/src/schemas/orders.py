from pydantic import BaseModel
from tortoise.contrib.pydantic import pydantic_model_creator

from src.database.models import Order

OrderInSchema = pydantic_model_creator(
    Order,
    name="OrderIn",
    exclude=(
        "product.product_reviews",
        "product.category",
        "product.description",
        "product.on_stock",
        "product.brand",
        "product.category_id",
        "product.images",
        "user",
        "user_id",
    ),
)
OrderOutSchema = pydantic_model_creator(
    Order,
    name="Order",
    exclude=("modified_at", "user.password", "user.created_at", "user.modified_at"),
)


class UpdateOrder(BaseModel):
    status: int
