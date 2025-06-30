import { useState, useEffect } from "react";
import type { Expense, User } from "./types";
import {
  login,
  register,
  fetchExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "./api";
import AuthForm from "./components/AuthForm";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./App.css";

function App() {
  //-----------------------------------------State variables for user authentication
  // this is the main state management for the app
  // it will hold the token for authenticated requests, the login mode (login or register),
  // and the form data for authentication
  const [token, setToken] = useState<string | null>(null);
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const [authForm, setAuthForm] = useState<User>({
    username: "",
    password: "",
  });

  //----------------------------------------------------State variables for expenses
  // this is the main state management for the expenses
  // it will hold the list of expenses, the form data for adding/editing expenses,
  // and the ID of the expense being edited
  // it will also hold the error state for the app
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseForm, setExpenseForm] = useState({
    name: "",
    amount: "",
    category: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  // Error state
  const [error, setError] = useState<string | null>(null);

  // Load expenses when logged in
  useEffect(() => {
    if (token) loadExpenses();
  }, [token]);

  const loadExpenses = async () => {
    try {
      const data = await fetchExpenses(token!);
      console.log(data);
      setExpenses(data);
    } catch (err) {
      setError("Failed to load expenses");
    }
  };

  //  Handle user authentication
  const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthForm({
      ...authForm,
      [e.target.name]: e.target.value,
    });
  };

  // Expense form change handler
  const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseForm({
      ...expenseForm,
      [e.target.name]: e.target.value,
    });
  };

  //  Handle login or registration
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!authForm.username || !authForm.password) {
      setError("Username and password are required");
      return;
    }
    try {
      const response = isLoginMode
        ? await login(authForm)
        : await register(authForm);
      setToken(response.access_token);
      setAuthForm({ username: "", password: "" });
    } catch (err) {
      setError("Authentication failed. Please check your credentials.");
    }
  };

  //  Handle expense submit (add or update)
  const handleExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseForm.name || !expenseForm.amount || !expenseForm.category) {
      setError("All fields are required");
      return;
    }
    setError(null);
    try {
      if (editingId !== null) {
        // Update existing expense
        const updatedExpense = await updateExpense(
          editingId,
          {
            name: expenseForm.name,
            amount: parseFloat(expenseForm.amount),
            category: expenseForm.category,
          },
          token!
        );
        setExpenses(
          expenses.map((exp) => (exp.id === editingId ? updatedExpense : exp))
        );
      } else {
        // Add new expense
        const newExpense = await addExpense(
          {
            name: expenseForm.name,
            amount: parseFloat(expenseForm.amount),
            category: expenseForm.category,
          },
          token!
        );
        setExpenses([...expenses, newExpense]);
      }
      setExpenseForm({ name: "", amount: "", category: "" });
      setEditingId(null);
    } catch (err) {
      setError("Failed to save expense. Please try again.");
    }
  };

  const handleDeleteExpense = async (id: number) => {
    setError(null);
    try {
      await deleteExpense(id, token!);
      setExpenses(expenses.filter((exp) => exp.id !== id));
    } catch (err) {
      setError("Failed to delete expense. Please try again.");
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setExpenseForm({
      name: expense.name,
      amount: expense.amount.toString(),
      category: expense.category,
    });
    setEditingId(expense.id);
  };

  const handleLogout = () => {
    setToken(null);
    setExpenses([]);
    setExpenseForm({ name: "", amount: "", category: "" });
    setEditingId(null);
  };

  // Show authentication form if user is not logged in
  if (!token) {
    return (
      <AuthForm
        isLoginMode={isLoginMode}
        authForm={authForm}
        error={error}
        onChange={handleAuthChange}
        onSubmit={handleAuthSubmit}
        onToggleMode={() => {
          setIsLoginMode(!isLoginMode);
          setError(null);
          setAuthForm({ username: "", password: "" });
        }}
      />
    );
  }

  return (
    <div>
      <div>
        <Header onLogout={handleLogout} />
        {error && <div>{error}</div>}
        <ExpenseForm
          expenseForm={expenseForm}
          editingId={editingId}
          onChange={handleExpenseChange}
          onSubmit={handleExpenseSubmit}
          onCancel={() => {
            setEditingId(null);
            setExpenseForm({ name: "", amount: "", category: "" });
            setError(null);
          }}
        />
        <ExpenseList
          expenses={expenses}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
        />
      </div>
    </div>
  );
}

export default App;
