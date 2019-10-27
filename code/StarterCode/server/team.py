import pymongo

class Team:

    # We could also have Team/League class
    # then we could easily manage their data.
    # Also works for user profile.

    def __init__(self, obj):
        self._id = obj.get("_id")   # _id of in mongoDB
        self.name = obj.get("name")
        # other attributes of a team

    def to_json(self): 

        # In case we want to get a json file
        # of a player's performance and information

        player_json = {
            "name" = self.name,
            # other attributes of a team
        }
        return team_json