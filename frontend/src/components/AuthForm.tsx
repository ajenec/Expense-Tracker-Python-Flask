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
const AuthForm: React.FC<AuthFormProps> = ({
  isLoginMode, // Whether in login for register mode
  authForm, // Form data
  error, // Error message
  onChange, // Input change handler
  onSubmit, // Form submit handler
  onToggleMode, // Toggle mode handler
}) => (
  <div>
    <div>
      <h1>{isLoginMode ? "Login" : "Register"}</h1> {/*Show Login or Register*/}
      {error && <div>{error}</div>} {/*Show error if exists*/}
      <form onSubmit={onSubmit}>
        {" "}
        {/*Form with submit handler*/}
        <input
          name="username" // Input for username
          value={authForm.username} // Value from form state
          onChange={onChange} // Change handler
          placeholder="Username" // Placeholder text
        />
        <input
          name="password" // Input for password
          type="password"
          value={authForm.password}
          onChange={onChange}
          placeholder="Password"
        />
        <button type="submit">{isLoginMode ? "Login" : "Register"}</button>
      </form>
      <div>
        <p>
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}
        </p>
        <button onClick={onToggleMode}>
          {isLoginMode ? "Register" : "Login"}
        </button>
      </div>
    </div>
  </div>
);

export default AuthForm;
