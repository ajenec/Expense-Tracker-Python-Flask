from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from models import db, Expense, User
from config import Config

# Start Flask application
app = Flask(__name__)
# Load configuration from Config class
app.config.from_object(Config)

# Start extensions
CORS(app)  # Enable CORS for the application
db.init_app(app)  # Initialize SQLAlchemy with the Flask app
bcrypt = Bcrypt(app)  # Initialize Bcrypt for password hashing
jwt = JWTManager(app)  # Initialize JWT for authentication



# Route to get all expenses for the current user
@app.route('/expenses', methods=['GET'])
@jwt_required()
def get_expenses():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()

    #  Check if user exists
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    # Get all expenses for the user
    expenses = Expense.query.filter_by(user_id=user.id).all()
    return jsonify([expense.to_dict() for expense in expenses]), 200

# Route to add a new expense for the current user
@app.route('/expenses', methods=['POST'])
@jwt_required()
def add_expense():
    # Get the JSON data from the request
    data = request.get_json()
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    
    # create a new expense
    new_expense = Expense(
        name=data['name'],
        amount=data['amount'],
        category=data['category'],
        user_id=user.id
    )

    # Add the new expense to the database
    db.session.add(new_expense)
    db.session.commit()
    return jsonify(new_expense.to_dict()), 201

# Route to update an existing expense
@app.route('/expenses/<int:id>', methods=['PUT'])
@jwt_required()
def update_expense(id):
    data = request.get_json()
    expense = Expense.query.get(id)
    
    # Check if the expense exists
    if not expense:
        return jsonify({'message': 'Expense not found'}), 404
    
    # Update the expense with the new data
    expense.name = data['name']
    expense.amount = data['amount']
    expense.category = data['category']
    db.session.commit()
    return jsonify(expense.to_dict()), 200


# route to delete an expense
@app.route('/expenses/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_expense(id):
    expense = Expense.query.get(id)

    if not expense:
        return jsonify({'message': 'Expense not found'}), 404
    db.session.delete(expense)
    db.session.commit()
    return jsonify({'message': 'Expense deleted successfully'}), 204

# Route to register a new user
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Validate the input
    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400
    
    # Check if the username already exists
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 400
    
    # Hash the password and create a new user
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username=username, password=hashed_password) # Create a new User instance
    # Add the new user to the database
    # This will create a new user in the database with the hashed password
    db.session.add(new_user)
    db.session.commit() # Commit the changes to the database
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    #  Validate the input
    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400
    
    # Check if the user exists and verify the password
    user = User.query.filter_by(username=username).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid credentials'}), 401
    
    # Create JWT token
    # This token will be used for authentication in requests
    access_token = create_access_token(identity=username)
    return jsonify({'access_token': access_token, 'message': "Loin Successful!"}), 200


# Run the Flask application
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables
    app.run(debug=True)  # Start the Flask application in debug mode

# Note: debug mode is used to automatically reload the server on code changes.

