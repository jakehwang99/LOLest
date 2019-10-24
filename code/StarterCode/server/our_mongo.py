import pymongo
from pymongo import (
    MongoClient,
    )

# connet atlas cluster to our Flask
client = pymongo.MongoClient("mongodb+srv://billy:test@lolest0-t8qkt.mongodb.net/test?retryWrites=true&w=majority") 
db = client["lolest"]
players_collection = db["players"]
