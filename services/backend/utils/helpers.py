import re

from fastapi import Form
from pydantic.dataclasses import dataclass


def is_valid_email(email: str):
    regex = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b"
    # pass the regular expression
    # and the string into the fullmatch() method

    if re.fullmatch(regex, email):
        return email


@dataclass
class AdditionalUserDataForm:
    email: str = Form()
    first_name: str | None = Form(None)
    second_name: str | None = Form(None)