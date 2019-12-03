import pymongo
from pymongo import (
    MongoClient,
    )

class lolMongo:
    
    def __init__(self):
        # connet atlas cluster to our Flask
        self.client = pymongo.MongoClient("mongodb+srv://billy:test@lolest0-t8qkt.mongodb.net/test?retryWrites=true&w=majority") 
        self.db = self.client.get_database("LOLesports")

        ########################################################################
        #                      League Table Page                               #
        ########################################################################
        self.LCK_Summer_2019 = self.db.get_collection("LCK-Summer-2019")
        self.LCK_Spring_2019 = self.db.get_collection("LCK-Spring-2019")

        self.LCS_Spring_2013 = self.db.get_collection("LCS-Spring-2013")
        self.LCS_Spring_2014 = self.db.get_collection("LCS-Spring-2014")
        self.LCS_Spring_2015 = self.db.get_collection("LCS-Spring-2015")
        self.LCS_Spring_2016 = self.db.get_collection("LCS-Spring-2016")
        self.LCS_Spring_2017 = self.db.get_collection("LCS-Spring-2017")
        self.LCS_Spring_2018 = self.db.get_collection("LCS-Spring-2018")
        self.LCS_Spring_2019 = self.db.get_collection("LCS-Spring-2019")
        self.LCS_Summer_2013 = self.db.get_collection("LCS-Summer-2013")
        self.LCS_Summer_2014 = self.db.get_collection("LCS-Summer-2014")
        self.LCS_Summer_2015 = self.db.get_collection("LCS-Summer-2015")
        self.LCS_Summer_2016 = self.db.get_collection("LCS-Summer-2016")
        self.LCS_Summer_2017 = self.db.get_collection("LCS-Summer-2017")
        self.LCS_Summer_2018 = self.db.get_collection("LCS-Summer-2018")
        self.LCS_Summer_2019 = self.db.get_collection("LCS-Summer-2019")

        self.LEC_Spring_2019 = self.db.get_collection("LEC-Spring-2019")
        self.LEC_Summer_2019 = self.db.get_collection("LEC-Summer-2019")

        self.LPL_Spring_2014 = self.db.get_collection("LPL-Spring-2014")
        self.LPL_Spring_2015 = self.db.get_collection("LPL-Spring-2015")
        self.LPL_Spring_2016 = self.db.get_collection("LPL-Spring-2016")
        self.LPL_Spring_2017 = self.db.get_collection("LPL-Spring-2017")
        self.LPL_Spring_2018 = self.db.get_collection("LPL-Spring-2018")
        self.LPL_Spring_2019 = self.db.get_collection("LPL-Spring-2019")
        self.LPL_Summer_2014 = self.db.get_collection("LPL-Summer-2014")
        self.LPL_Summer_2015 = self.db.get_collection("LPL-Summer-2015")
        self.LPL_Summer_2016 = self.db.get_collection("LPL-Summer-2016")
        self.LPL_Summer_2017 = self.db.get_collection("LPL-Summer-2017")
        self.LPL_Summer_2018 = self.db.get_collection("LPL-Summer-2018")
        self.LPL_Summer_2019 = self.db.get_collection("LPL-Summer-2019")

class lolMongoPlayers:

    def __init__(self):
        # connet atlas cluster to our Flask
        self.client = pymongo.MongoClient("mongodb+srv://billy:test@lolest0-t8qkt.mongodb.net/test?retryWrites=true&w=majority") 
        self.db = self.client.get_database("LOLplayers")

        ########################################################################
        #                      Individual Player page                          #
        ########################################################################
        self.LCK = self.db.get_collection("LCK")
        self.LCS = self.db.get_collection("LCS")
        self.LEC = self.db.get_collection("LEC")
        self.LPL = self.db.get_collection("LPL")

lolMongo = lolMongo()
lolMongoPlayers = lolMongoPlayers()