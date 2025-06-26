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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            {isLoginMode ? "Login" : "Register"}
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              name="username"
              value={authForm.username}
              onChange={handleAuthChange}
              placeholder="Username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              name="password"
              type="password"
              value={authForm.password}
              onChange={handleAuthChange}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAuthSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
            >
              {isLoginMode ? "Login" : "Register"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLoginMode
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <button
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setError(null);
                setAuthForm({ username: "", password: "" });
              }}
              className="mt-2 text-blue-600 hover:text-blue-800 font-medium underline"
            >
              {isLoginMode ? "Register" : "Login"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main expense tracker
  // ...existing code...
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Expense Tracker
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow transition duration-150"
          >
            Logout
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 shadow">
            {error}
          </div>
        )}

        {/* Expense Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            {editingId !== null ? "Update Expense" : "Add New Expense"}
          </h2>
          <form onSubmit={handleExpenseSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                name="name"
                value={expenseForm.name}
                onChange={handleExpenseChange}
                placeholder="Expense Name"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              />
              <input
                name="amount"
                value={expenseForm.amount}
                onChange={handleExpenseChange}
                placeholder="Amount"
                type="number"
                step="0.01"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              />
              <input
                name="category"
                value={expenseForm.category}
                onChange={handleExpenseChange}
                placeholder="Category"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-2 px-8 rounded-lg shadow transition duration-150"
              >
                {editingId !== null ? "Update" : "Add"}
              </button>
              {editingId !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setExpenseForm({ name: "", amount: "", category: "" });
                    setError(null);
                  }}
                  className="bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white font-bold py-2 px-8 rounded-lg shadow transition duration-150"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Expenses List */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Your Expenses
          </h2>
          {expenses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No expenses yet. Add your first expense above!
            </p>
          ) : (
            <div className="space-y-4">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-blue-50 transition duration-150 shadow-sm"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-6">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {expense.name}
                      </h3>
                      <span className="text-2xl font-bold text-green-600">
                        ${expense.amount.toFixed(2)}
                      </span>
                      <span className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {expense.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditExpense(expense)}
                      className="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg shadow transition duration-150"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow transition duration-150"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {/* Total */}
              <div className="border-t pt-6 mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-gray-800">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    $
                    {expenses
                      .reduce((sum, exp) => sum + exp.amount, 0)
                      .toFixed(2)}{" "}
                    {/* this is to add all the expenses and return the total */}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
