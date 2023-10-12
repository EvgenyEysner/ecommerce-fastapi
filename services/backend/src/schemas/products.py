from tortoise.contrib.pydantic import pydantic_model_creator

from src.database.models import Product

ProductSchema = pydantic_model_creator(Product, name="Product", exclude_readonly=True)
# ProductInSchema = pydantic_model_creator(Product, name="ProductIn", exclude=("user_id",), exclude_readonly=True)
