import React from "react";

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => (
  <div>
    <h1>Expense Tracker</h1>
    <button onClick={onLogout}>Logout</button>
  </div>
);

export default Header;
