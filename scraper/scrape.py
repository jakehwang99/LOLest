import requests
from bs4 import BeautifulSoup

import pandas as pd
import time
from numpy import random

def geturl(league, year, season):
    if league == "LCS":
        if year == 2013:
            return 'https://lol.gamepedia.com/NA_LCS/Season_3/{0}_Season/Player_Statistics'.format(season)
        elif year < 2019:
            return 'https://lol.gamepedia.com/NA_LCS/{0}_Season/{1}_Season/Player_Statistics'.format(year, season)
    
    elif league == "LEC":
        if year < 2019:
            return None

    elif league == "LCK":
        if year < 2019:
            return None
    
    elif league == "LPL":
        if year == 2013:
            return None

    return 'https://lol.gamepedia.com/{0}/{1}_Season/{2}_Season/Player_Statistics'.format(league, year, season)

def getdf(soup):
    table = soup.find('div', attrs={'class': 'wide-content-scroll'})

    if table == None:
        return pd.DataFrame()

    teams = soup.findAll('td', attrs={'class': 'spstats-subject'})
    teams = [team.a['title'] for team in teams]

    rows = table.tbody.findAll('tr')
    
    header = [e.text for e in rows[4].findAll('th')]
    header[0:2] = ['Team', 'Player']

    data = []
    
    normalized_rows = rows[5:]
    for i in range(len(normalized_rows)):
        data.append([])
        elements = normalized_rows[i].findAll('td')

        for j in range(len(elements)):
            if j == 0:
                data[i].append(teams.pop(0))
            else:
                data[i].append(elements[j].text)

    df = pd.DataFrame(data, columns = header)
    return df

if __name__ == '__main__':
    leagues = ["LCS", "LCK", "LEC", "LPL"]    
    seasons = ["Spring", "Summer"]

    for league in leagues:
        for season in seasons:
            for year in range(2013,2050):
                print("Analyzing stats from {0} {1} {2}...".format(league, season, year))

                url = geturl(league, year, season)
                if url == None:
                    print("No data on this year\n")
                    continue
                
                time.sleep(random.randint(3))

                page = requests.get(url)
                soup = BeautifulSoup(page.text, 'html.parser')
           
                df = getdf(soup)

                if df.empty:
                    print("No data for future year\n")
                    break

                #print("writing data to {0}-{1}-{2}.csv\n".format(league, season, year))
                #df.to_csv("data/{0}-{1}-{2}.json".format(league, season, year), index=False)
                print("writing data to {0}-{1}-{2}.json\n".format(league, season, year))
                df.to_json("data/{0}-{1}-{2}.json".format(league, season, year), orient='table', index=False)

