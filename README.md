# Expense Tracker Application

A full stack expense tracker application built with React (TypeScript) and Flask/PostgreSQL backend.

## Project Structure

```
Expense-Tracker-Python-Flask/
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── requirements.txt
│   └── ... (other backend files)
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── api.ts
│   │   ├── types.ts
│   │   └── components/
│   │       ├── AuthForm.tsx
│   │       ├── Header.tsx
│   │       ├── ExpenseForm.tsx
│   │       └── ExpenseList.tsx
│   ├── package.json
│   └── ... (other frontend files)
└── README.md
```

## Prerequisites

- Node.js & npm
- Python 3.x
- PostgreSQL

## Backend Setup

1, Create and activate a virtual environment:

```sh
python -m venv venv
source venv/bin/activate
```

2. Install dependencies:

```sh
pip install -r requirements.txt
```

3. Set up your PostgreSQL database and update the connection string in your backend config.
4. Run the backend server:

```sh
flask run
```

## Frontend Setup

1. Navigate to the `frontend` directory:

```sh
cd frontend
```

2. Install dependencies:

```sh
npm install
```

3. Start the React development server:

```sh
npm start
```

## API Endpoints

- `POST /register` - Register a new user
- `POST /login` - Login and receive JWT token
- `GET /expenses` - Get all expense (auth required)
- `POST /expenses` - Add a new expense (auth required)
- `PUT /expenses/<id>` - Update an expense (auth required)
- `DELETE /expenses/<id>` - Delete an expense (auth required)

## Features

- User registration and authentication (JWT)
- Add, edit, and delete expenses
- View a list of expenses with total calculation
- Responsive and modern UI with Tailwind CSS

## Technologies Used

### Frontend

- React (TypeScript)
- Tailwind CSS

### Backend

- Flask
- Flask-JWT-Extended
- SQLAlchemy
- PostgreSQL

## Development

- Run backend and frontend servers concurrently for development.
- Update environment variables as needed for database and JWT secret.

## License

MIT
