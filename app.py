from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import os

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///" + \
    os.path.join(basedir, 'DB.db')
app.config['SQLALCHEMY_ DATABASE_URI'] = False
db = SQLAlchemy(app)

class Confessions(db.Model):
    """
    Takes two parameters:
    @name: String
    @message: String
    """
    __tablename__ = 'confessions'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), index=True)
    message = db.Column(db.String(256))

@app.route('/api/post', methods=['POST'])
def post_confession():
    name = request.json.get('name')
    message = request.json.get('message')
    if name is None or message is None:
        return jsonify({"status": "Name or message cannot be blank"}), 400
    confess = Confessions(name=name, message=message)
    db.session.add(confess)
    db.session.commit()
    return jsonify({"status": "Confession added successfully!"}), 201

import api_routes.get

if __name__ == '__main__':
    db.create_all()
    app.run()
