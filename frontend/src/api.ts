import type { AuthResponse, Expense, User } from "./types";

const API_BASE_URL = "http://127.0.1:5000";

export const login = async (user: User): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return response.json();
};

export const register = async (user: User): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return response.json();
};

export const fetchExpenses = async (token: string): Promise<Expense[]> => {
  const response = await fetch(`${API_BASE_URL}/expenses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }
  return response.json();
};

export const addExpense = async (
  expense: Omit<Expense, "id">,
  token: string
): Promise<Expense> => {
  const response = await fetch(`${API_BASE_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expense),
  });
  if (!response.ok) {
    throw new Error("Failed to add expense");
  }
  return response.json();
};

export const updateExpense = async (
  id: number,
  expense: Omit<Expense, "id">,
  token: string
): Promise<Expense> => {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expense),
  });
  if (!response.ok) {
    throw new Error("Failed to update expense");
  }
  return response.json();
};

export const deleteExpense = async (
  id: number,
  token: string
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }
};
