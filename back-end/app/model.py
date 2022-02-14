from re import S
from fastapi import UploadFile
from pydantic import BaseModel


class User(BaseModel):
    username: str
    password: str

class Post(BaseModel):
    title: str
    desc: str
    price: int
    user: str
    imgURL:str