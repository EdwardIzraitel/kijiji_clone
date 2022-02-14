def post_serializer(item)->dict:
    return{
        "id":str(item["_id"]),
        "title":item["title"],
        "desc":item["desc"],
        "price":item["price"],
        "user":item["user"],
        "imgURL":item["imgURL"]
    }

def posts_serializer(entity) -> list:
    return [post_serializer(post) for post in entity]