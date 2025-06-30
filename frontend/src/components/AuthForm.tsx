import React from "react";
import type { User } from "../types";

// Define the props for the AuthForm components
interface AuthFormProps {
  isLoginMode: boolean; // True if in login mode, false if in register mode
  authForm: User; // Object holding username and password
  error: string | null; // Error message, if any
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Handler for input changes
  onSubmit: (e: React.FormEvent) => void; //Handler for form submission
  onToggleMode: () => void;
}

// Functional component for authentication form
const AuthForm = ({
  isLoginMode, // Whether in login for register mode
  authForm, // Form data
  error, // Error message
  onChange, // Input change handler
  onSubmit, // Form submit handler
  onToggleMode, // Toggle mode handler
}: AuthFormProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 ">
      <div>
        <h1 className="text-[40px] my-10 font-bold font-mono flex justify-center">
          {isLoginMode ? "Login" : "Register"}
        </h1>
        {error && <div>{error}</div>}
        <form
          onSubmit={onSubmit}
          className="flex flex-col flex-wrap items-center justify-self-center my-5 p-6 bg-neutral-100 rounded shadow"
        >
          {/* Username row */}
          <div className="flex items-center my-3 w-full max-w-xs">
            <label className="mr-2 w-24 text-right">Username:</label>
            <input
              className="flex-1 px-2 py-1 border rounded"
              name="username"
              value={authForm.username}
              onChange={onChange}
              placeholder="Username"
            />
          </div>
          {/* Password row */}
          <div className="flex items-center my-3 w-full max-w-xs">
            <label className="mr-2 w-24 text-right">Password:</label>
            <input
              className="flex-1 px-2 py-1 border rounded"
              name="password"
              type="password"
              value={authForm.password}
              onChange={onChange}
              placeholder="Password"
            />
          </div>
          <button className="bg-amber-200 mt-4 px-4 py-2 rounded" type="submit">
            {isLoginMode ? "Login" : "Register"}
          </button>
        </form>
        <div className="flex flex-col items-center justify-center my-3 w-full max-w-xs text-center">
          <p className="mb-2">
            {isLoginMode
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <button
            className="bg-amber-200 px-4 py-2 rounded hover:bg-amber-300 transition"
            onClick={onToggleMode}
            type="button"
          >
            {isLoginMode ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
