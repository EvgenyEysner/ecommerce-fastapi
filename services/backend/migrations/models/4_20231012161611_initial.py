from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS "user" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "username" VARCHAR(20) NOT NULL UNIQUE,
    "full_name" VARCHAR(50),
    "password" VARCHAR(128),
    "created_at" TIMESTAMPTZ NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMPTZ NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    "is_admin" BOOL NOT NULL  DEFAULT False
);
CREATE TABLE IF NOT EXISTS "product" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "services" VARCHAR(71) NOT NULL  DEFAULT 'Оплата полученных заказов от службы заказа такси',
    "created_at" TIMESTAMPTZ NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMPTZ NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    "quantity" INT NOT NULL  DEFAULT 10,
    "price" DECIMAL(10,2) NOT NULL  DEFAULT 0,
    "owner_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);
COMMENT ON COLUMN "product"."services" IS 'PAYMENT_TAXI_ORDERS: Оплата полученных заказов от службы заказа такси\nWITHDRAWAL_FOR_DRIVERS: Вывод денег водителям такси, оплаченных пассажирам безналичным способом\nVOUCHERS_PAYMENT: Оплата за использование сервиса получения электронных путевых листов\nPAYMENT_FOR_MECHANICS: Оплата в пользу механика, выпускающего на линию\nPAYMENT_MEDICAL_EXAMINATION: Оплата в пользу медорганизации за предрейсовый медосмотр\nSOFTWARE_PRODUCTS_LICENCE: Оплата за использование программных продуктов разработчика';
CREATE TABLE IF NOT EXISTS "order" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "status" SMALLINT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMPTZ NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    "services_id" INT NOT NULL REFERENCES "product" ("id") ON DELETE CASCADE,
    "user_id" INT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);
COMMENT ON COLUMN "order"."status" IS 'PENDING: 1\nPAID: 2';
CREATE TABLE IF NOT EXISTS "aerich" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "version" VARCHAR(255) NOT NULL,
    "app" VARCHAR(100) NOT NULL,
    "content" JSONB NOT NULL
);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        """
