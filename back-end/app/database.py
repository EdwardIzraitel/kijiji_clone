import asyncio
import motor.core
from dotenv import find_dotenv, load_dotenv
import os
from pymongo import MongoClient
from model import Post, User
from schemas.post_schema import posts_serializer

load_dotenv()

client = MongoClient("mongodb+srv://edward:"+os.getenv("MONGODB_KEY")+"@bijiji.efe37.mongodb.net/Bijiji?retryWrites=true&w=majority")
db = client.prod
postCollection = db["posts"]
userCollection = db["users"]
# database = client.Postings
# collection = database["post"]
# collection_user = database["users"]

#==============USERS
def find_user(username:str):
    document = userCollection.find_one({"username":username})
    print(document)
    return document

def create_user(user):
    userExist = find_user(user.username)
    if userExist==None:
        result = userCollection.insert_one({"username":user.username,"password":user.password})
        return user
    return None
    
#Commented code for testing
# def fetch_all_users():
#     users = []
#     cursor = userCollection.find()

#     for document in cursor:
#         users.append(User(**document))
#     return users

# def remove_user(username:str):
#     doc = userCollection.delete_one({"username":username})
#     return doc

#=================POSTS
def fetch_post(title):
    document =postCollection.find_one({"title":title})
    return document


def fetch_all_posts():
    posts = (posts_serializer(postCollection.find()))
    return posts


def create_post(titleStr:str,descStr:str,prc:int,username:str,url:str):
    user = find_user(username)
    if user!=None:
        result = postCollection.insert_one({"title":titleStr,"desc":descStr,"price":prc,"user":username,"imgURL":url})
        return result
    return None

def update_post(id,imgURL):
    res = postCollection.update_one({"_id": id}, {"$set": {"imgURL": imgURL}})
    document = postCollection.find_one({"_id": id})
    return document


def remove_post(id):
    document = postCollection.find_one({"_id": id})
    if document:
        postCollection.delete_one({"_id":id})
        return True
    return False

def remove_post_by_title(title):
    document = postCollection.find_one({"title": title})
    if document:
        postCollection.delete_one({"title":title})
        return True
    return False
