import random
import pymongo
from pymongo import (
    MongoClient,
    )
import json
from flask import Flask, render_template

app = Flask(__name__)

# connect local mongoDB with a db named "lolest"
# and collections named "players" to store players' info
# and "teams" to store teams' info
client = pymongo.MongoClient("mongodb+srv://billy:test@lolest0-t8qkt.mongodb.net/test?retryWrites=true&w=majority") 
#this gives us access to the atlas cluster
db = client.testdata #testdata is
collection = db.testCollection
# teams = db.teams

@app.route('/')
def index():
    names = "Names: "
    for document in collection.find({}, {"_id":0, "name":1}):
        names += document["name"] + " "
    return render_template('index.html', data = names)

@app.route('/teams') # take note of this decorator syntax, it's a common pattern
def teams():
    # It is good practice to only call a function in your route end-point,
    # rather than have actual implementation code here.
    # This allows for easier unit and integration testing of your functions.
    return get_teams()


def get_teams():
    teams_list = ['TSM', 'C9', 'TL', 'CG', 'OG', '100T', 'EF', 'GG', 'CLG', 'FQ']
    return random.choice(teams_list)


if __name__ == '__main__':
    app.run()