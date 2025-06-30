import React from "react";
// import type { Expense } from "../types";

interface ExpenseFormProps {
  expenseForm: { name: string; amount: string; category: string };
  editingId: number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const ExpenseForm = ({
  expenseForm,
  editingId,
  onChange,
  onSubmit,
  onCancel,
}: ExpenseFormProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        {editingId !== null ? "Update Expense" : "Add New Expense"}
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col gap-3">
          <input
            name="name"
            value={expenseForm.name}
            onChange={onChange}
            placeholder="Expense Name"
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
          <input
            name="amount"
            value={expenseForm.amount}
            onChange={onChange}
            placeholder="Amount"
            type="number"
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
          <input
            name="category"
            value={expenseForm.category}
            onChange={onChange}
            placeholder="Category"
            className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>
        <div className="flex gap-3 justify-end">
          <button
            type="submit"
            className="bg-amber-300 hover:bg-amber-400 text-gray-800 font-semibold px-6 py-2 rounded shadow transition duration-200"
          >
            {editingId !== null ? "Update" : "Add"}
          </button>
          {editingId !== null && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded shadow transition duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
