from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/allocate', methods=['POST'])
def allocate():
    data = request.get_json()
    vault_balance = data.get('vault_balance', 0)

    # ⚡️ Simple allocation logic (placeholder AI)
    allocation = {
        "BTC": vault_balance * 0.4,
        "ETH": vault_balance * 0.3,
        "SOL": vault_balance * 0.2,
        "USDT": vault_balance * 0.1
    }

    return jsonify({"allocation": allocation})

if __name__ == '__main__':
    app.run(debug=True)
