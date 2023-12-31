from enum import IntEnum

from tortoise import fields, models
from tortoise.validators import MaxValueValidator, MinValueValidator


class User(models.Model):
    id = fields.IntField(pk=True)
    email = fields.CharField(max_length=255, unique=True)
    full_name = fields.CharField(max_length=50, null=True)
    password = fields.CharField(max_length=128, null=True)
    created_at = fields.DatetimeField(auto_now_add=True)
    modified_at = fields.DatetimeField(auto_now=True)
    is_admin = fields.BooleanField(default=False)


class Category(models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=255)

    def __str__(self):
        return self.name


class Image(models.Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=64)
    src = fields.CharField(max_length=128)
    product = fields.ForeignKeyField(
        "models.Product", related_name="images", on_delete="CASCADE"
    )

    def __str__(self):
        return f"{self.name}, {self.src}"


class Product(models.Model):
    # class SERVICES(str, Enum):
    #     PAYMENT_TAXI_ORDERS = "Оплата полученных заказов от службы заказа такси"
    #     WITHDRAWAL_FOR_DRIVERS = "Вывод денег водителям такси, оплаченных пассажирам безналичным способом"
    #     VOUCHERS_PAYMENT = "Оплата за использование сервиса получения электронных путевых листов"
    #     PAYMENT_FOR_MECHANICS = "Оплата в пользу механика, выпускающего на линию"
    #     PAYMENT_MEDICAL_EXAMINATION = "Оплата в пользу медорганизации за предрейсовый медосмотр"
    #     SOFTWARE_PRODUCTS_LICENCE = "Оплата за использование программных продуктов разработчика"

    id = fields.IntField(pk=True)
    category = fields.ForeignKeyField("models.Category", related_name="category")
    name = fields.CharField(max_length=255)
    description = fields.CharField(max_length=1000, null=True)
    created_at = fields.DatetimeField(auto_now_add=True)
    modified_at = fields.DatetimeField(auto_now=True)
    quantity = fields.IntField(
        default=0, null=True, validators=[MinValueValidator(min_value=0)]
    )
    on_stock = fields.BooleanField(default=True)
    brand = fields.CharField(max_length=64, null=True)
    price = fields.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.name}, {self.quantity}, {self.price} on {self.created_at}"


class Order(models.Model):
    class Status(IntEnum):
        PENDING = 1
        PAID = 2

    id = fields.IntField(pk=True)
    status = fields.IntEnumField(Status)
    product = fields.ForeignKeyField(
        "models.Product", related_name="ordered_by", on_delete="CASCADE"
    )
    user = fields.ForeignKeyField(
        "models.User", related_name="orders", on_delete="CASCADE"
    )
    quantity = fields.IntField(default=0)
    total = fields.IntField(default=0)
    created_at = fields.DatetimeField(auto_now_add=True)
    modified_at = fields.DatetimeField(auto_now=True)

    def __str__(self):
        return f"{self.user}, {self.product}, {self.status} on {self.created_at}"


class Review(models.Model):
    id = fields.IntField(pk=True)
    text = fields.TextField(unique=False)
    rating = fields.IntField(default=1, validators=[MaxValueValidator(max_value=5)])
    owner = fields.ForeignKeyField(
        "models.User", related_name="reviews", on_delete="CASCADE"
    )
    product = fields.ForeignKeyField(
        "models.Product", related_name="product_reviews", on_delete="CASCADE"
    )
    created_at = fields.DatetimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product}, {self.owner}, {self.text}"
