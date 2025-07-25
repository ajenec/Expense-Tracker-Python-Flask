import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration class for Flask application
# It reads configuration values from environment variables.
class Config:
   SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
   SQLALCHEMY_TRACK_MODIFICATIONS = False
   SECRET_KEY = os.getenv('SECRET_KEY')
   JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')



