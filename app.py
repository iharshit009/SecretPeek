from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
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


if __name__ == '__main__':
    db.create_all()
    app.run()
