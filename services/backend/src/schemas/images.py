from tortoise.contrib.pydantic import pydantic_model_creator

# from pydantic import BaseModel

from src.database.models import Image

ImageSchema = pydantic_model_creator(Image, name="Images", exclude_readonly=True)


# class UpdateReview(BaseModel):
#     text: str
