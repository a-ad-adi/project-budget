import React, { useEffect, useState } from "react";
import axios from "../shared/axios";
import { BudgetItem } from "../../backend/types/BudgetItem";
import BudgetItemComponent from "./BudgetItem";

export default function BudgetItems() {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  useEffect(() => {
    axios
      .get<{ budgetItems: Array<BudgetItem> }>("budget-items")
      .then((res) => {
        setBudgetItems(res.data.budgetItems);
      });
  }, []);

  return (
    <div className="budget-items">
      {!budgetItems.length
        ? "Loading budget items"
        : budgetItems.map((bi) => <BudgetItemComponent budgetItem={bi} />)}
    </div>
  );
}
