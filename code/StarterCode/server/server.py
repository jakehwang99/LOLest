import random
import pymongo
import json
from flask import Flask, render_template
from player import Player
from models.our_mongo import lolMongo

app = Flask(__name__)

@app.route('/', methods=['GET'])        # for testing
def index():                             
    data = Player.get_teams()
    return render_template('index.html', data = data)

@app.route('/players', methods=['GET'])  # retrieve all players' name
def players():
    players = []
    try:
        players = Player.get_players()
    except Exception as e:
        print("err: ", e)
    return players

@app.route('/teams', methods=['GET'])    # retrieve all teams' name
def teams():
    teams = []
    try:
        teams = Player.get_teams()
    except Exception as e:
        print("err: ", e)
    return teams

@app.route('/leagues', methods=['GET'])   # retrieve the whole league in json
def leagues():
    data = []
    try:
        data = Player.get_league()
    except Exception as e:
        print("err: ", e)
    return data

@app.route('/<player>', methods=['GET']) # retrieve a player's document
def get_selected(player):
    selected = []
    try:
        selected = Player.find_one(player)
    except Exception as e:
        print("err: ", e)
    return selected


if __name__ == '__main__':
    app.run()
