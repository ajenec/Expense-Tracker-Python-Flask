import React from "react";

interface ExpenseFormProps {
  expenseForm: { name: string; amount: string; category: string };
  editingId: number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
