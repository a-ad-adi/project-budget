import { BudgetItem } from './BudgetItem';
import { Project } from './Project';

export interface Budget {
  id: number;
  projectId: number;
  project?: Project;
  items?: BudgetItem[];
}
