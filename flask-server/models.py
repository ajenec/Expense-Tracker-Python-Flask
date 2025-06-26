from flask_sqlalchemy import SQLAlchemy

#  Initialize the SQLAlchemy object
db = SQLAlchemy()

# This is the Expense model for the database
# It represents an expense entry with fields for name, amount, category, and a foreign key
# linking it to a user. A foreign key is a reference to another table, in this case, the User table.
class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    amount = db.Column(db.Float)
    category = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) # Key link to User model

    # function to change user input to a dictionary
    # This is useful for converting the model to JSON format
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'amount': self.amount,
            'category': self.category
        }

# This is the User model for the database
# It represents a user with fields for username and password.
# It also has a relationship to the Expense model, allowing us to access expenses associated with a user.
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    expenses = db.relationship('Expense', backref='user', lazy=True)  # Relationship to Expense model

    # function to change user input to a dictionary
    # This is useful for converting the model to JSON format
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username
        }