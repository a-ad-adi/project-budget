import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import * as budgetItemsData from "./data/budget-items.json";
import * as budgetsData from "./data/budgets.json";
import * as projectsData from "./data/projects.json";
import { projectBudget } from "./projectBudget";
import { BudgetItem } from "./types/BudgetItem";
import { Budget } from "./types/Budget";
import { Project } from "./types/Project";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());

const projects: Project[] = projectsData.data;
const budgets: Budget[] = budgetsData.data;
const budgetItems: BudgetItem[] = budgetItemsData.data;

//budget items
app.get("/api/budget-items", (req: Request, res: Response) => {
  const { budgetItemId } = req.query;

  if (budgetItemId !== undefined) {
    return res.send({
      budgetItem: budgetItems.find((b) => b.id === Number(budgetItemId)),
    });
  }

  res.send({ budgetItems });
});

//upsert
app.post("/api/budget-items", (req: Request, res: Response) => {
  const budgetItem: BudgetItem = req.body.budgetItem;

  let idx = budgetItems.findIndex((bi: BudgetItem) => bi.id === budgetItem.id);

  if (idx !== -1) {
    budgetItems[idx] = budgetItem;
  } else {
    budgetItems.push(budgetItem);
    idx = budgetItems.length - 1;
  }

  return res.send({ budgetItem: budgetItems[idx] });
});

app.delete("/api/budget-items", (req: Request, res: Response) => {
  const { budgetItemId } = req.body;
  const bii = Number(budgetItemId);

  const idx = budgetItems.findIndex((bi) => bi.id === bii);

  if (idx === -1) {
    res.statusCode = 404;
    res.send({ msg: "Budget item not found" });
  }
});

//projects
app.get("/api/projects", (req: Request, res: Response) => {
  return res.send(projects);
});

//budgets
app.get("/api/budgets", (req: Request, res: Response) => {
  const project = projects.find((p) => p.id === 1);
  const budget = budgets.find((b) => b.projectId === project?.id);
  const items = budgetItems.filter((i) => i.budgetId === budget?.id);

  budgetItems.map((i) => {
    if (!i.approvedAt) {
      i.status = "UNAPPROVED";
    } else {
      const approvalDate = new Date(i.approvedAt);
      const todayDate = new Date();
      if (
        approvalDate.getTime() > new Date().setDate(todayDate.getDate() - 90) &&
        approvalDate.getTime() < new Date().setDate(todayDate.getDate() - 75)
      ) {
        i.status = "EXPIRES_SOON";
        return i;
      }
      if (
        approvalDate.getTime() < new Date().setDate(todayDate.getDate() - 90)
      ) {
        i.status = "EXPIRED";
        return i;
      }
      i.status = "APPROVED";
      return i;
    }
  });

  if (!(project && budget && items)) {
    throw new Error("Undefined project, budget, or budget items");
  }

  res.send({ projectBudget: { project, budget, items } });
});

app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
