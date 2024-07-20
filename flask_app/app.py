from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/ip', methods=['GET'])
def get_ip():
    ip = request.remote_addr
    return jsonify({'ip': ip})

@app.route('/api/toi_add', methods=['POST'])
def add_toi():
    data = request.get_json()
    name = data.get('name')
    count = data.get('count')
    # Here you can process the data, save it to a database, etc.
    response = {
        'message': 'Data received successfully',
        'name': name,
        'count': count
    }
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000)
