from tortoise.contrib.pydantic import pydantic_model_creator
from pydantic import BaseModel

from src.database.models import Category

CategorySchema = pydantic_model_creator(Category, name="Category", exclude_readonly=True)

class UpdateCategory(BaseModel):
    name: str
