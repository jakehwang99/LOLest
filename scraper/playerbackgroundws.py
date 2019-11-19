from bs4 import BeautifulSoup
from requests import get
from pymongo import MongoClient
import json
import pandas as pd


client = MongoClient('mongodb+srv://billy:test@lolest0-t8qkt.mongodb.net/test?retryWrites=true&w=majority')
db = client['LOLplayers']



leagues = ['LCS', 'LCK', 'LEC', 'LPL']
columns = ['Name', 'Country of Birth', 'Birthday', 'Residency', 'Team', 'Role', 'IGN']
df = pd.DataFrame(columns=columns)
for league in leagues:
    url = 'https://lol.gamepedia.com/' + league + '/2019_Season/Spring_Season/Player_Statistics'
    response = get(url)
    html_soup = BeautifulSoup(response.text, 'html.parser')
    type(html_soup)
    div = html_soup.find('div', {'class': 'wide-content-scroll'})
    table = div.find('table')
    rows = table.findAll('tbody')[0].findAll('tr')
    players = []
    for row in rows:
        player = row.findAll('td')
        if(len(player) > 2):
            aTag = player[1].find('a')
            type(aTag.attrs)
            try : players.append(aTag.attrs['title'])
            except KeyError:
                continue

    for player in players:
        url = 'https://lol.gamepedia.com/' + player
        response = get(url)
        html_soup = BeautifulSoup(response.text, 'html.parser')
        type(html_soup)
        table = html_soup.find('table', {'class': 'infobox InfoboxPlayer'})
        tr = table.findAll('tr')

        name = '_'
        bCountry = '_'
        residence = '_'
        birthday = 'n/a'
        team = '_'
        role = '_'

        for row in tr:
            td = row.findAll('td')
            if(len(td) > 1):
                if(td[0].text == 'Name'):
                    name = td[1].text
                elif(td[0].text == 'Country of Birth'):
                    bCountry = td[1].text
                elif(td[0].text == 'Birthday'):
                    birthday = td[1].text
                elif(td[0].text == 'Residency'):
                    flag = td[1].find('div', class_ = 'region-icon')
                    residence = flag.text
                elif(td[0].text == 'Team'):
                    teamname = td[1].find('span')
                    team = teamname.text
                elif(td[0].text == 'Role'):
                    role = td[1].text
        background = {'Name': [name], 'Country of Birth': [bCountry], 'Birthday': [birthday], 'Residency': [residence], 'Team': [team], 'Role': [role], 'IGN': [player]}
        dfRow = pd.DataFrame(background, columns = columns)
        df = pd.concat([df, dfRow], ignore_index=True)
    
    collection = db[league]
    data = json.loads(df.T.to_json()).values()
    collection.insert_many(data)
