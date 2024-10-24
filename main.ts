import { Context, Expense, Payment } from "./types/dataAccess.ts";
import BudgetDbContext from "./types/dbContext.ts";
import env from "./Env.json" with { type: "json" };
import { PrintService } from "./services/PrintService.ts";
import { DateService } from "./services/DateService.ts";

async function main() {
  const config = env.dbConfig;
  const context = new BudgetDbContext();
  const targetMonth: [number, string] = DateService.getTargetMonth();

  const db: Context = await context.connectToDatabase(config);
  const categories = await context.getCategories(db);
  const expenses = await context.getExpenses(db);
  const payments = await context.getPayments(db, targetMonth[0]);

  context.closeDbConnection(db)

  const totalExpenses: number = expenses.reduce(
    (acc: number, exp: Expense) => acc + exp.Amount,
    0,
  );
  let totalPayments: number = 0;

  PrintService.printHeader(targetMonth[1]);

  for (const i in categories) {
    const exps: Array<Expense> = expenses.filter((e) =>
      e.CategoryId === categories[i].CategoryId
    );

    if (exps.length === 0) continue;

    PrintService.printSubHeader(categories[i].CategoryName);

    exps.forEach((expense) => {
      if (expense.CategoryId === categories[i].CategoryId) {
        const dueDate: string = DateService.getDueDate(expense.DayDue);
        const paid: Payment | undefined = payments.find((p) =>
          p.ExpenseId === expense.ExpenseId
        );

        PrintService.printExpense(expense, dueDate, paid);
        if (paid) {
          totalPayments += expense.Amount;
        }

        PrintService.printLineBreak("-");
      }
    });
  }

  PrintService.printSummary(totalExpenses, totalPayments);
  PrintService.printMessage("Finished, press Enter key to close.");

}

main();

// Wait for user to press any key before exiting
// Close on input
await Deno.stdin.read(new Uint8Array(1));

Deno.exit(0);