import type { Expense } from "../types";

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}

const ExpenseList = ({ expenses, onEdit, onDelete }: ExpenseListProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Expenses</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-500">
          No expenses yet. Add your first expense above!
        </p>
      ) : (
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between bg-neutral-100 rounded p-4"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-700">
                  {expense.name}
                </h3>
                <div className="text-gray-600">
                  <span className="mr-2">${expense.amount.toFixed(2)}</span>
                  <span className="italic">{expense.category}</span>
                </div>
              </div>
              <div className="space-x-2">
                <button
                  className="px-3 py-1 rounded bg-amber-200 hover:bg-amber-300 text-gray-800 font-medium transition"
                  onClick={() => onEdit(expense)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 rounded bg-red-200 hover:bg-red-300 text-gray-800 font-medium transition"
                  onClick={() => onDelete(expense.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-6">
            <div className="text-xl font-bold text-gray-800">
              <span className="mr-2">Total:</span>
              <span>
                ${expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
