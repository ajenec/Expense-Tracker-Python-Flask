export interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
}

export interface User {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}
