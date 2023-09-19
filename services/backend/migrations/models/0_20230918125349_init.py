from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "username" VARCHAR(20) NOT NULL UNIQUE,
    "full_name" VARCHAR(50),
    "password" VARCHAR(128),
    "created_at" TIMESTAMPTZ NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMPTZ NOT NULL  DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "orders" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "status" SMALLINT NOT NULL,
    "services" VARCHAR(56) NOT NULL  DEFAULT 'Консультации по сопровождению бизнеса',
    "created_at" TIMESTAMPTZ NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMPTZ NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    "user_id" INT NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE
);
COMMENT ON COLUMN "orders"."status" IS 'PENDING: 1\nPAID: 2';
COMMENT ON COLUMN "orders"."services" IS 'BUSINESS_SUPPORT: Консультации по сопровождению бизнеса\nBOOKKEEPING: Ведение бухгалтерии и консультация с привлечением аудита\nREPORTING: Сдача отчетности по данным клиента\nCIVIL_LAW: Консультация и помощь по гражданскому праву\nSOLE_PROPRIETORSHIP: Открытие ИП\nLCC_OPENING: Открытие ООО\nEDM: Консультация и подключение к ЭДО\nCASH_REGISTERS: Консультация и помощь в подключении ККТ';
CREATE TABLE IF NOT EXISTS "aerich" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "version" VARCHAR(255) NOT NULL,
    "app" VARCHAR(100) NOT NULL,
    "content" JSONB NOT NULL
);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        """
