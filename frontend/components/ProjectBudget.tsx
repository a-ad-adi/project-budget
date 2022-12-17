import React, { useEffect, useState } from "react";
import axios from "../shared/axios";
import { BudgetItem } from "../../backend/types/BudgetItem";
import BudgetItemComponent from "./BudgetItem";
import { Project } from "../../backend/types/Project";
import { Budget } from "../../backend/types/Budget";

interface ProjectBudget {
  project: Project;
  budget: Budget;
  items: BudgetItem[];
}

export default function ProjectBudgetComponent() {
  const [projectBudget, setProjectBudget] = useState<ProjectBudget | null>(
    null
  );
  useEffect(() => {
    axios.get<{ projectBudget: ProjectBudget }>("budgets").then((res) => {
      setProjectBudget(res.data.projectBudget);
    });
  }, []);

  return !projectBudget ? (
    <div>"Loading project budget"</div>
  ) : (
    <div className="project-budget">
      <h1>Budget for project: ${projectBudget.project.name}</h1>
      <table>
        <thead>
          <tr>
            <th>Item #</th>
            <th>Amount</th>
            <th>Approved on</th>
            <th>Approved by</th>
            <th>Status</th>
          </tr>
          {projectBudget.items.map((bi) => (
            <BudgetItemComponent budgetItem={bi} />
          ))}
        </thead>
      </table>
    </div>
  );
}
