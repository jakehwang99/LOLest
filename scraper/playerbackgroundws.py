from bs4 import BeautifulSoup
from requests import get
import pandas as pd


url = 'https://lol.gamepedia.com/LEC/2019_Season/Spring_Season/Player_Statistics'
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
    name = tr[3].findAll('td')[1].text
    country = tr[4].findAll('td')[1].text

    # print(tr[1].text)    
