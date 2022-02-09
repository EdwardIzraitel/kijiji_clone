from re import S
from pydantic import BaseModel

class Post(BaseModel):
    title: str
    # description: str
    # price: float

class LoginItem(BaseModel):
    username: str
    password: str