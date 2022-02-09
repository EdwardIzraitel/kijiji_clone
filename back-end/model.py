from pydantic import BaseModel

class Post(BaseModel):
    _id: int
    title: str
    # description: str
    # price: float