import pymongo
import json
from our_mongo import players_collection

class Player:

    # We could also have Team/League class
    # then we could easily manage their data.
    # Also works for user profile.

    def __init__(self, obj):
        self._id = obj.get("_id")   # _id of player in mongoDB
        self.name = obj.get("name")
        self.team = obj.get("team")
        self.game = obj.get("game")
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
            "name":self.name,
            "team":self.team,
            "game":self.game, 
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
    def get_players():
        data = players_collection.find().distinct("Player")  # return a list of players
        to_json = json.dumps({"data": data})
        return to_json

    @staticmethod
    def get_teams():
        data = players_collection.find().distinct("Team")    # return a list of teams
        to_json = json.dumps({"data": data})
        return to_json

    @staticmethod
    def get_league():
        data = []
        ret = players_collection.find({}, {"_id":0})         # return a list of documents
        for doc in ret:
            data.append(doc)
        to_json = json.dumps({"data": data})
        return to_json

    @staticmethod
    def find_one(player_name):
        data = players_collection.find_one({"Player": player_name}, {"_id":0})  # return the player's document
        return data