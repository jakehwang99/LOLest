import pymongo
from pymongo import (
    MongoClient,
    )

class lolMongo:
    
    def __init__(self):
        # connet atlas cluster to our Flask
        self.client = pymongo.MongoClient("mongodb+srv://billy:test@lolest0-t8qkt.mongodb.net/test?retryWrites=true&w=majority") 
        self.db = self.client.get_database("lolest")

        self.LCK_Summer_2019 = self.db.get_collection("LCK_Summer_2019")
        self.LCK_Spring_2019 = self.db.get_collection("LCK_Spring_2019")

        self.LCS_Spring_2013 = self.db.get_collection("LCS_Spring_2013")
        self.LCS_Spring_2014 = self.db.get_collection("LCS_Spring_2014")
        self.LCS_Spring_2015 = self.db.get_collection("LCS_Spring_2015")
        self.LCS_Spring_2016 = self.db.get_collection("LCS_Spring_2016")
        self.LCS_Spring_2017 = self.db.get_collection("LCS_Spring_2017")
        self.LCS_Spring_2018 = self.db.get_collection("LCS_Spring_2018")
        self.LCS_Spring_2019 = self.db.get_collection("LCS_Spring_2019")
        self.LCS_Summer_2013 = self.db.get_collection("LCS_Summer_2013")
        self.LCS_Summer_2014 = self.db.get_collection("LCS_Summer_2014")
        self.LCS_Summer_2015 = self.db.get_collection("LCS_Summer_2015")
        self.LCS_Summer_2016 = self.db.get_collection("LCS_Summer_2016")
        self.LCS_Summer_2017 = self.db.get_collection("LCS_Summer_2017")
        self.LCS_Summer_2018 = self.db.get_collection("LCS_Summer_2018")
        self.LCS_Summer_2019 = self.db.get_collection("LCS_Summer_2019")

        self.LEC_Spring_2019 = self.db.get_collection("LEC_Spring_2019")
        self.LEC_Summer_2019 = self.db.get_collection("LEC_Summer_2019")

        self.LPL_Spring_2014 = self.db.get_collection("LPL_Spring_2014")
        self.LPL_Spring_2015 = self.db.get_collection("LPL_Spring_2015")
        self.LPL_Spring_2016 = self.db.get_collection("LPL_Spring_2016")
        self.LPL_Spring_2017 = self.db.get_collection("LPL_Spring_2017")
        self.LPL_Spring_2018 = self.db.get_collection("LPL_Spring_2018")
        self.LPL_Spring_2019 = self.db.get_collection("LPL_Spring_2019")
        self.LPL_Summer_2014 = self.db.get_collection("LPL_Summer_2014")
        self.LPL_Summer_2015 = self.db.get_collection("LPL_Summer_2015")
        self.LPL_Summer_2016 = self.db.get_collection("LPL_Summer_2016")
        self.LPL_Summer_2017 = self.db.get_collection("LPL_Summer_2017")
        self.LPL_Summer_2018 = self.db.get_collection("LPL_Summer_2018")
        self.LPL_Summer_2019 = self.db.get_collection("LPL_Summer_2019")

lolMongo = lolMongo()