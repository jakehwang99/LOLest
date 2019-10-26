# League of Legends eSports StatTracker
#### Collaborators: Jake Hwang, Michael Hsieh, Perry Yang, Gus Person, Alfred Lam

## Problem:
eSports is a relatively new medium of entertainment; therefore, the resources needed to stay up to date on each team are sparse, making it difficult for users to figure out the team’s performance against their opponents.

## Solution:
Web-application that displays the statistics of each team and its players in a way that makes it simple for the user to understand how each team is doing.

## Approach:
Using web-scraping on Python (BeautifulSoup), we will grab data from official sources to create visualizations of League of Legends eSports teams and its players.

## Skills/Tools
Python (BeautifulSoup) <-> MySQL <-> Python (Flask library) <-> React.js/HTML/CSS/Javascript

Having skills in MySQL (or any other database implementation), Flask would be great

## Features:
* Search bar for teams, players, and roles
* Display data as table and different kinds of charts
* Team and individual players pages with indepth stats and picture
* Access to the stream (if available)
* and more!

# Initial Setup
1. git clone the repository
2. Ensure you have npm, python and pip installed on your machine.  (you can check the version to see if it is installed)
3. Navigate to code/StaterCode/client and execute "npm install". This will download and install the dependencies listed in package.json.
4. Run "npm start" in code/StarterCode/client to start the React server.
5. Install flask (pip install flask).
6. Start the server. Go to the server directory and do "python server.py".
7. Go to localhost:8080
8. It is working if it displays an image with all the teams in the LCS and prints out "Retrieved team from backend: {some team}" underneath.
9. If you receive an error "access to xmlhttprequest at from origin has been blocked by cors policy" you may need to download this chrome extension or equivalent https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en
