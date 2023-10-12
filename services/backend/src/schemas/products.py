from pydantic import BaseModel
from tortoise.contrib.pydantic import pydantic_model_creator

from src.database.models import Product

ProductSchema = pydantic_model_creator(Product, name="Product")


class UpdateProduct(BaseModel):
    status: int
