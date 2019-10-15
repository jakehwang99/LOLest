import random
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/teams') # take note of this decorator syntax, it's a common pattern
def teams():
    # It is good practice to only call a function in your route end-point,
    # rather than have actual implementation code here.
    # This allows for easier unit and integration testing of your functions.
    return get_teams()


def get_teams():
    teams_list = ['TSM', 'C9', 'TL', 'CG', 'OG', '100T', 'EF', 'GG', 'CLG', 'FQ']
    return random.choice(teams_list)


if __name__ == '__main__':
    app.run()