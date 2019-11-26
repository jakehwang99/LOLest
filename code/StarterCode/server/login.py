from flask import Flask, render_template, url_for, request, session, redirect
import pymongo
import ast
import json as js
import bcrypt as bcrypt

app = Flask(__name__)

client = pymongo.MongoClient('mongodb+srv://billy:test@lolest0-t8qkt.mongodb.net/test?retryWrites=true&w=majority')
db = client.registeredUsers


@app.route('/')
def index():
    if 'username' in session:
        return 'You are logged in as ' + session['username']

    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    strn = request.data
    userpass = (ast.literal_eval(strn.decode('utf-8')))['params']
    username = userpass['username']
    password = userpass['password']
    print(username + password)
    users = db.users
    login_user = users.find_one({'name' : username})
    if login_user:
        if bcrypt.hashpw(password.encode('utf-8'), login_user['password'].encode('utf-8')) == login_user['password']:
            session['username'] = username
            return 'You are logged in as ' + session['username']
    return 'Failed'

@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        strn = request.data
        userpass = (ast.literal_eval(strn.decode('utf-8')))['params']
        username = userpass['username']
        password = userpass['password']
        print(username + password)
        users = db.users
        existing_user = users.find_one({'name' : username})

        if existing_user is None:
            hashpass = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            users.insert({'name' : username, 'password' : hashpass})
            session['username'] = username
            return 'Registration successful'
        
        return 'That username already exists!'

    return 'Not sure how to get here lol'

if __name__ == '__main__':
    app.secret_key = 'mysecret'
    app.run(debug=True)
