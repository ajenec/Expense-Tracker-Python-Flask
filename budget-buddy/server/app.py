from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

expenses = []

@app.route('/expenses', methods=['GET'])
def get_expenses():
    return jsonify(expenses)

@app.route('/expenses', methods=['POST'])
def add_expense():
    data = request.json
    expenses.append(data)
    return jsonify({message: 'Expense added successfully!'}), 201

if __name__ == '__main__':
    app.run(debug=True)

