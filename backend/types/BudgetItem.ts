import { Budget } from './Budget';
import { Nullable } from './utils';
export interface BudgetItem {
  id: number;
  budgetId: number;
  budget?: Budget;
  itemNumber: number;
  amount: number;
  approvedBy: Nullable<string>;
  approvedAt: Nullable<string>;
  status: Nullable<string>;
}
