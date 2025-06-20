import { useState } from "react";

export const AddExpenseForm = () => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch("http://localhost:5000/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input name="title" onChange={handleChange} placeholder="Title" />
      <input name="amount" onChange={handleChange} />
      <input name="category" onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
};
