from flask import jsonify
from app import app, db, Confessions


@app.route('/api/get', methods=['GET'])
def get_confession():
    messages = Confessions.query.all()
    messages_tuple = tuple(map(lambda confession: {
        'id': confession.id,
        'title': confession.message
    }, messages))
    return jsonify(messages_tuple)
