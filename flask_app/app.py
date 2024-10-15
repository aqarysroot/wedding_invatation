from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os

app = Flask(__name__)
CORS(app)

# Configuration for the PostgreSQL database
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://yourusername:yourpassword@postgres:5432/yourdatabase')
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)  # Initialize Flask-Migrate

class TOI(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    count = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(100), nullable=True)

@app.route('/api/ip', methods=['GET'])
def get_ip():
    ip = request.remote_addr
    return jsonify({'ip': ip})

@app.route('/api/toi_add', methods=['POST'])
def add_toi():
    data = request.get_json()
    name = data.get('name')
    count = data.get('count')
    map = {
        0: "Не приду",
        1: "Приду",
        2: "Я приду с партнером"
    }
    new_toi = TOI(name=name, count=count, description=map.get(int(count), "Не валидный ответ"))
    db.session.add(new_toi)
    db.session.commit()
    response = {
        'message': 'Data received successfully',
        'name': name,
        'count': count
    }
    return jsonify(response), 200


@app.route('/api/toi_list', methods=['GET'])
def get_toi_list():
    toi_list = TOI.query.all()
    result = [
        {
            'id': toi.id,
            'name': toi.name,
            'count': toi.count,
            'description': toi.description
        } for toi in toi_list
    ]
    return jsonify(result), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000)
