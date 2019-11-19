import pymongo
import json
from our_mongo import lolMongo, lolMongoPlayers

class Player:

    # We could also have Team/League class
    # then we could easily manage their data.
    # Also works for user profile.

    def __init__(self, obj):
        self._id = obj.get("_id")   # _id of player in mongoDB
        self.PLAYER = obj.get("PLAYER")
        self.TEAM = obj.get("TEAM")
        self.GAMES = obj.get("GAMES")
        self.w = obj.get("W")
        self.l = obj.get("L")
        self.wr = obj.get("WR")
        self.k = obj.get("K")
        self.d = obj.get("D")
        self.a = obj.get("A")
        self.kda = obj.get("KDA")
        self.cs = obj.get("CS")
        self.cspm = obj.get("CSPM")
        self.g = obj.get("g")
        self.gpm = obj.get("GPM")
        self.kpar = obj.get("KPAR")
        self.ks = obj.get("KS")
        self.gs = obj.get("GS")
        self.cp = obj.get("CP")

    def to_json(self): 

        player_json = {
            "PLAYER":self.PLAYER,
            "TEAM":self.TEAM,
            "GAMES":self.GAMES, 
            "W":self.w,
            "L":self.l,
            "WR":self.wr,
            "K":self.k,
            "D":self.d,
            "A":self.a,
            "KDA":self.kda,
            "CS":self.cs,
            "CSPM":self.cspm,
            "G":self.g,
            "GPM":self.gpm,
            "KPAR":self.kpar,
            "KS":self.ks,
            "GS":self.gs,
            "CP":self.cp,
        }
        return player_json

    @staticmethod
    def get_players(tourney):
        t = tourney.split("_")
        tourney = "-".join(t)
        data = lolMongo.db.get_collection(tourney).find().distinct("PLAYER")  # return a list of players
        to_json = json.dumps({"data": data})
        return to_json

    @staticmethod
    def get_teams(tourney):
        t = tourney.split("_")
        tourney = "-".join(t)
        data = lolMongo.db.get_collection(tourney).find().distinct("TEAM")    # return a list of teams
        to_json = json.dumps({"data": data})
        return to_json

    @staticmethod
    def get_tourney(tourney):
        data = []
        t = tourney.split("_")
        tourney = "-".join(t)
        ret = lolMongo.db.get_collection(tourney).find({}, {"_id":0})         # return a list of documents
        for doc in ret:
            data.append(doc)
        to_json = json.dumps({"data": data})
        return to_json

    @staticmethod
    def find_one(tourney, player_name):
        t = tourney.split("_")
        tourney = "-".join(t)
        data = lolMongo.db.get_collection(tourney).find_one({"PLAYER": player_name}, {"_id":0})  # return the player's document
        to_json = json.dumps({"data": data})
        return to_json

    @staticmethod
    def get_player(league, player_name):
        data = lolMongoPlayers.db.get_collection("test").find_one({"Name": player_name}, {"_id":0})
        to_json = json.dumps({"data": data})
        return to_json