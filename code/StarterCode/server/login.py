from flask import Flask, render_template, url_for, request, session, redirect
import pymongo
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
    users = db.users
    login_user = users.find_one({'name' : request.form['username']})
    if login_user:
        if bcrypt.hashpw(request.form['pass'].encode('utf-8'), login_user['password'].encode('utf-8')) == login_user['password']:
            session['username'] = request.form['username']
            return 'You are logged in as ' + session['username']
    return bcrypt.hashpw(request.form['pass'].encode('utf-8'), login_user['password'].encode('utf-8'))

@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        users = db.users
        existing_user = users.find_one({'name' : request.form['username']})

        if existing_user is None:
            hashpass = bcrypt.hashpw(request.form['pass'].encode('utf-8'), bcrypt.gensalt())
            users.insert({'name' : request.form['username'], 'password' : hashpass})
            session['username'] = request.form['username']
            return redirect(url_for('index'))
        
        return 'That username already exists!'

    return render_template('register.html')

if __name__ == '__main__':
    app.secret_key = 'mysecret'
    app.run(debug=True)
