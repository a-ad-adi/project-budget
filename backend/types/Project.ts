import { Budget } from './Budget';

export interface Project {
  id: number;
  name: string;
  budget?: Budget;
}
