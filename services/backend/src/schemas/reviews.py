from tortoise.contrib.pydantic import pydantic_model_creator
from pydantic import BaseModel

from src.database.models import Review

ReviewSchema = pydantic_model_creator(Review, name="Reviews", exclude_readonly=True)


class UpdateReview(BaseModel):
    text: str
