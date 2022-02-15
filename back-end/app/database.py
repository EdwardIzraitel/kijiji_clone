import asyncio
import motor.core
from pymongo import MongoClient
from model import Post, User
from schemas.post_schema import posts_serializer

client = MongoClient('mongodb://root:example@mongo:27017')
# client = MotorClient(
#     'mongodb://root:example@mongo:27017')
# client.get_io_loop = asyncio.get_running_loop
database = client.Postings
collection = database["post"]
collection_user = database["users"]

#==============USERS
def find_user(username:str):
    document = collection_user.find_one({"username":username})
    return document

def create_user(user):
    userExist = find_user(user.username)
    if userExist==None:
        result = collection_user.insert_one({"username":user.username,"password":user.password})
        return user
    return None
    
#Commented code for testing
# def fetch_all_users():
#     users = []
#     cursor = collection_user.find()

#     for document in cursor:
#         users.append(User(**document))
#     return users

# def remove_user(username:str):
#     doc = collection_user.delete_one({"username":username})
#     return doc

#=================POSTS
def fetch_post(title):
    document =collection.find_one({"title":title})
    return document


def fetch_all_posts():
    posts = (posts_serializer(collection.find()))
    return posts


def create_post(titleStr:str,descStr:str,prc:int,username:str,url:str):
    user = find_user(username)
    if user!=None:
        result = collection.insert_one({"title":titleStr,"desc":descStr,"price":prc,"user":username,"imgURL":url})
        return result
    return None

def update_post(id,imgURL):
    res = collection.update_one({"_id": id}, {"$set": {"imgURL": imgURL}})
    document = collection.find_one({"_id": id})
    return document


def remove_post(id):
    document = collection.find_one({"_id": id})
    if document:
        collection.delete_one({"_id":id})
        return True
    return False

def remove_post_by_title(title):
    document = collection.find_one({"title": title})
    if document:
        collection.delete_one({"title":title})
        return True
    return False
