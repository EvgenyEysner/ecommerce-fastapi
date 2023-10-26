from tortoise.contrib.pydantic import pydantic_model_creator
from pydantic import BaseModel

from src.database.models import Product

ProductSchema = pydantic_model_creator(Product, name="Product")


class UpdateProduct(BaseModel):
    quantity: int
