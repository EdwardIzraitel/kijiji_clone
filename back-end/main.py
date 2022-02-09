from urllib import response
from fastapi import FastAPI, HTTPException
from model import Post
from fastapi.middleware.cors import CORSMiddleware

from database import (
    fetch_post,
    fetch_all_posts,
    create_post,
    update_post,
    remove_post
)

app = FastAPI()

origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/posts")
async def get_posts():
    response = await fetch_all_posts()
    return response

@app.get("/api/post{title}", response_model=Post)
async def get_post_by_id(title):
    response = await fetch_post(title)
    if response:
        return response
    raise HTTPException(404,"There is no post with this id: {title}")
    

@app.post("/api/post", response_model=Post)
async def post_post(post: Post):
    response = await create_post(post.dict())
    if response:
        return response
    raise HTTPException(404,"Something went wrong / Bad Request")

@app.put("/api/post{title}",response_model=Post)
async def put_post(title: str):
    response = await update_post(title)
    if response:
        return response
    raise HTTPException(404,"Something went wrong / Bad Request")

@app.delete("/api/post{id}")
async def delete_post(id):
    response = await remove_post(id)
    if response:
        return "Successfully deleted post"
    raise HTTPException(404,"No post with {id} to delete")
    