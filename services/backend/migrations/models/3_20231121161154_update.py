from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "product" ALTER COLUMN "quantity" SET DEFAULT 1;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "product" ALTER COLUMN "quantity" SET DEFAULT 10;"""
