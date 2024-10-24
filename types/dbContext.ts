import mssql from "npm:mssql";
import {
  Category,
  Context,
  DbConfig,
  Expense,
  Payment,
  ResultsSet,
} from "./dataAccess.ts";

export default class BudgetDbContext {
  constructor() {
    console.log("Database context created.");
  }

  async connectToDatabase(config: DbConfig): Promise<Context> {
    return (await mssql.connect(config));
  }

  async query(context: Context, query: string): Promise<ResultsSet> {
    let results: ResultsSet = { recordset: [], rowsAffected: [] };
    try {
      results = await context.request().query(query);
    } catch (err) {
      throw err;
    }
    return results;
  }

  async getCategories(context: Context): Promise<Array<Category>> {
    let results: ResultsSet = { recordset: [], rowsAffected: [] };
    try {
      results = await context.request().query("SELECT * FROM categories");
    } catch (err) {
      throw err;
    }
    return results.recordset;
  }

  async getExpenses(context: Context): Promise<Array<Expense>> {
    let results: ResultsSet = { recordset: [], rowsAffected: [] };
    try {
      results = await context.request().query("SELECT * FROM expenses");
    } catch (err) {
      throw err;
    }
    return results.recordset;
  }

  async getPayments(
    context: Context,
    targetMonth: number,
  ): Promise<Array<Payment>> {
    let results: ResultsSet = { recordset: [], rowsAffected: [] };
    try {
      results = await context.request().query(
        `SELECT * FROM payments WHERE TargetMonth = ${targetMonth}`,
      );
    } catch (err) {
      throw err;
    }
    return results.recordset;
  }

  closeDbConnection(context: Context) {
    context.close();
    console.info("Database connection closed.");
  }
}
