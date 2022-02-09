import asyncio
import motor.core

from motor.motor_asyncio import (
    AsyncIOMotorClient as MotorClient,
)
from model import Post


client = MotorClient(
    'mongodb://root:example@mongo:27017')
client.get_io_loop = asyncio.get_running_loop
database = client.Postings
collection = database.post


async def fetch_post(title):
    document = await collection.find_one({"_id": title})  # {"title": title})
    return document


async def fetch_all_posts():

    posts = []
    cursor = collection.find({})
    async for document in cursor:
        posts.append(Post(**document))
    return posts


async def create_post(post):
    document = post
    result = await collection.insert_one(document)
    return document


async def update_post(id, title):
    await collection.update_one({"id": id}, {"$set": {"title": title}})
    document = await collection.find_one({"id": id})
    return document


async def remove_post(id):
    document = await collection.find_one({"id": id})
    print(document)
    await collection.delete_one({"id": id})
    return True
