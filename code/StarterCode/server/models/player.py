import pymongo
# from Desktop.LOLest.code.StarterCode.server.server import db

class Player:

    # We could also have Team/League class
    # then we could easily manage their data.
    # Also works for user profile.

    def __init__(self, obj):
        self._id = obj.get("_id")   # _id of in mongoDB
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
        # other attributes of a player

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

    # def getAll(self):
    #     return db.players.find()