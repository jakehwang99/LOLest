import requests
from bs4 import BeautifulSoup

import pandas as pd

if __name__ == '__main__':
    print('testing bs4')
    page = requests.get('https://lol.gamepedia.com/LCS/2019_Season/Summer_Season/Player_Statistics')
    soup = BeautifulSoup(page.text, 'html.parser')
    #print(type(soup))

    table = soup.find('div', attrs={'class': 'wide-content-scroll'})

    teams = soup.findAll('td', attrs={'class': 'spstats-subject'})
    teams = [team.a['title'] for team in teams]
    #print(teams)

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
            #print(element.title)

    df = pd.DataFrame(data, columns = header)
    df.to_csv("LCS-Summer-2019.csv", index=False)
