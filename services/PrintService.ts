import type { Expense, Payment } from "../types/dataAccess.ts";

const colors = {
  blue: "color: blue;",
  cyan: "color: cyan;",
  green: "color: green;",
  orange: "color: orange;",
  maroon: "color: maroon;",
  pink: "color: pink;",
  purple: "color: purple",
};

export class PrintService {
  static style = {
    bold: "font-weight: bold;",
    h1: "font-weight: bold; font-size: 16px;",
    h2: "font-weight: bold; font-size: 14px;",
    summary: {
      title: "color: blue; font-weight: bold; font-size: 14px",
    },
  };

  static printMessage(message: string): void {
    console.log(message);
  }

  static printError(error: string): void {
    console.error(error);
  }

  static printWarning(warning: string): void {
    console.warn(warning);
  }

  static printHeader(month: string) {
    this.printTitleBar(
      `Budget Report for ${month}`,
      "=",
      40,
      `${this.style.h1}; ${colors.blue}`,
    );
  }

  static printSubHeader(content: string) {
    this.printTitleBar(content, "=", 40, `${this.style.h2}; ${colors.purple}`);
  }

  static printExpense(
    expense: Expense,
    dueDate: string,
    paid: Payment | undefined,
  ) {
    if (paid) {
      console.log(
        `%c * ${expense.Exp_Name} - $${expense.Amount} - Paid on ${
          paid.PaymentDate.toISOString().split("T")[0]
        }`,
        colors.cyan,
      );
    } else {
      console.log(
        `%c * ${expense.Exp_Name} - $${expense.Amount} - ${dueDate}`,
        colors.orange,
      );
    }
  }

  static printSummary(totalExpenses: number, totalPayments: number) {
    this.printTitleBar("Summary", "=", 40, this.style.summary.title);

    console.log(
      `%c * Total Expenses: $${totalExpenses.toFixed(2)}`,
      "font-weight: bold",
    );

    console.log(
      `%c * Total Payments: $${totalPayments.toFixed(2)}`,
      `${colors.green}; ${this.style.bold}`,
    );

    this.printStyledLineBreak("-", this.style.summary.title, 40);

    console.log(
      `%c * Remaining Expenses: $${(totalExpenses - totalPayments).toFixed(2)}`,
      `${colors.maroon}; ${this.style.bold}`,
    );

    this.printStyledLineBreak("=", this.style.summary.title, 40);
  }

  static printTitleBar(
    title: string,
    char: string = "=",
    totalLength: number = 60,
    style: string,
  ) {
    const titleLength: number = title.length;
    const remainingLength: number = totalLength - titleLength;
    const halfLength: number = remainingLength / 2;
    const leftSide: number = Math.floor(halfLength);
    const rightSide: number = Math.ceil(halfLength);

    console.log(
      `%c${char.repeat(leftSide)} ${title} ${char.repeat(rightSide)}`,
      `${style}`,
    );
  }

  static printLineBreak(char: string, breakLength: number = 60) {
    console.log(char.repeat(breakLength));
  }

  static printStyledLineBreak(
    char: string,
    style: string,
    breakLength: number = 60,
  ) {
    console.log(`%c${char.repeat(breakLength)}`, style);
  }
}
