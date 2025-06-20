import { useState, useEffect } from "react";

export const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  }, []);

  return (
    <ul>
      {expenses.map((e: any, i) => (
        <li key={i}>
          {" "}
          {e.title} - {e.amount}[{e.category}]
        </li>
      ))}
    </ul>
  );
};
