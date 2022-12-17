import React from "react";
import { BudgetItem } from "../../backend/types/BudgetItem";

export default function BudgetItem({ budgetItem }: { budgetItem: BudgetItem }) {
  return (
    <tr className="budget-item">
      <td>budget item id: {budgetItem.id}</td>
      <td>budget id: {budgetItem.budgetId}</td>
      <td>item number: {budgetItem.itemNumber}</td>
      <td>amount: {budgetItem.amount}</td>
      <td>approved by: {budgetItem.approvedBy || "-"}</td>
      <td>approved at: {budgetItem.approvedAt || "-"}</td>
      <td>status: {budgetItem.status || "-"}</td>
    </tr>
  );
}
