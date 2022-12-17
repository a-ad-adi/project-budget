import { Budget } from './types/Budget';
import { BudgetItem } from './types/BudgetItem';
import { Project } from './types/Project';

export const projectBudget = (
  project: Project,
  budget: Budget,
  budgetItems: BudgetItem[],
): string => {
  const rows = budgetItems
    .map(
      (item) => `<tr>
      <td>${item.itemNumber}</td>
      <td>${item.approvedAt}</td>
      <td>${item.approvedBy}</td>
      <td>${item.amount}</td>
      <td>${item.status}</td>
    </tr>`,
    )
    .join('');
  const total = budgetItems.reduce((carry, i) => carry + i.amount, 0);

  return `<html>
  <body>
    <h1>Budget for project: ${project.name}</h1>
    <table>
      <thead>
        <tr>
          <th>Item #</th>
          <th>Amount</th>
          <th>Approved on</th>
          <th>Approved by</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
      <tfoot>
        <tr>
          <th colspan="3" />
          <th>${total}</th>
        </tr>
      </tfoot>
    </table>
  </body>
</html>`;
};
