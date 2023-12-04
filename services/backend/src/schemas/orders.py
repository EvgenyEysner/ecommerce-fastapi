from pydantic import BaseModel
from tortoise.contrib.pydantic import pydantic_model_creator

from src.database.models import Order

OrderInSchema = pydantic_model_creator(
    Order,
    name="OrderIn",
    exclude_readonly=True,
)
OrderOutSchema = pydantic_model_creator(
    Order,
    name="Order",
    exclude=("modified_at", "user.password", "user.created_at", "user.modified_at"),
)


class UpdateOrder(BaseModel):
    status: int
