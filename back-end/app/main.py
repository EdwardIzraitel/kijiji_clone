from multiprocessing import dummy
from dotenv import load_dotenv
import os
from fastapi import FastAPI, HTTPException, UploadFile, Depends, Form
from model import Post, User
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import jwt
from fastapi.encoders import jsonable_encoder
import boto3
from botocore.client import BaseClient
from botocore.exceptions import ClientError

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

def s3_auth()->BaseClient:
    s3_client = boto3.client(
        service_name='s3',
        aws_access_key_id = os.getenv("AWS_ACCESS_KEY"),
        aws_secret_access_key= os.getenv("AWS_SECRET_KEY")
    )
    return s3_client

from database import (
    fetch_post,
    fetch_all_posts,
    create_post,
    update_post,
    remove_post,
    find_user,
    create_user,
)

app = FastAPI(docs_url="/api/docs", openapi_url="/api")

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/posts")
async def get_posts():
    response = fetch_all_posts()
    return response

# @app.get("/api/post{title}", response_model=Post)
# def get_post_by_id(title):
#     response = fetch_post(title)
#     if response:
#         return response
#     raise HTTPException(404,"There is no post with this id: {title}")
    
@app.post("/api/newPost")
def upload_post(image:UploadFile = Form(...),title:str = Form(...),desc:str=Form(...),price:int=Form(...),username:str=Form(...),s3:BaseClient = Depends(s3_auth)):
    newPost = create_post(title,desc,price,username,"")
    try:
        imgURL = 'https://bijiji-images.s3.ca-central-1.amazonaws.com/'+str(newPost.inserted_id)+image.filename
        response=s3.upload_fileobj(image.file,'bijiji-images',str(newPost.inserted_id)+image.filename)
        res = update_post(newPost.inserted_id,imgURL)
        return imgURL
    except ClientError as e:
        remove_post(newPost.inserted_id)
        raise HTTPException(404,"Something went wrong / Bad Request")
        
    

# @app.delete("/api/post{title}")
# async def delete_post(title):
#     response =remove_post(title)
#     if response:
#         return "Successfully deleted post"
#     raise HTTPException(404,"No post with {title} to delete")

#========USERS=====
# @app.get("/api/login")
# def get_users():
#     response = fetch_all_users()
#     return response

@app.post("/api/register")
def register_user(user:User):
    response = create_user(user)
    
    if response != None:
        data = jsonable_encoder(user)
        encoded_jwt = jwt.encode(data, os.getenv("SECRET_KEY"), algorithm=os.getenv("ALGORITHM"))
        return {"token": encoded_jwt}
    raise HTTPException(404,"Username exists, try a different one")


@app.post("/api/login")
def user_login(user: User):
    res = find_user(user.username)
    if res!=None:
        data = jsonable_encoder(user)
        if data['username'] == res['username'] and data['password'] == res['password']:
            encoded_jwt = jwt.encode(data, os.getenv("SECRET_KEY"), algorithm=os.getenv("ALGORITHM"))
            return {"token": encoded_jwt}
        raise HTTPException(404,detail="wrong password")
    raise HTTPException(404,detail="username doesnt exists")

# @app.delete("/api/deleteUser{username}")
# def delete_user(username):
#     response = remove_user(username)
#     if response:
#         return "removed successfuly"
#     raise HTTPException(404,"cant delete")


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888)