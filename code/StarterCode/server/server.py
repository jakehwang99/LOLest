import random
import pymongo
import json
from flask import Flask, render_template
from player import Player
from our_mongo import lolMongo, lolMongoPlayers

app = Flask(__name__)

@app.route('/', methods=['GET'])        # for testing
def index():                             
    data = Player.get_teams()
    return render_template('index.html', data = data)

@app.route('/<tourney>/players', methods=['GET'])  # retrieve all players' name
def players(tourney):
    players = []
    try:
        players = Player.get_players(tourney)
    except Exception as e:
        print("err: ", e)
    return players

@app.route('/<tourney>/teams', methods=['GET'])    # retrieve all teams' name
def teams(tourney):
    teams = []
    try:
        teams = Player.get_teams(tourney)
    except Exception as e:
        print("err: ", e)
    return teams

@app.route('/<tourney>', methods=['GET'])   # retrieve the whole league in json
def tourney(tourney):
    data = []
    try:
        data = Player.get_tourney(tourney)
    except Exception as e:
        print("err: ", e)
    return data

@app.route('/<tourney>/<player>', methods=['GET']) # retrieve a player's document
def get_selected(tourney, player):
    selected = []
    try:
        selected = Player.find_one(tourney, player)
    except Exception as e:
        print("err: ", e)
    return selected

@app.route('/<league>/<player_name>/page', methods=['GET']) # retrieve a player's information
def player(league, player_name):
    try:
        player = Player.get_player(league, player_name)
    except Exception as e:
        print("err: ", e)
    return player

if __name__ == '__main__':
    app.run()
