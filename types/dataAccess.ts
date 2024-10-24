export type DbConfig = {
  user: string;
  password: string;
  server: string;
  database: string;
  options: {
    encrypt: boolean;
    trustServerCertificate: boolean;
  };
};

export type Context = {
  close: () => void;
  request: () => any;
};

export type ResultsSet = {
  recordset: Array<any>;
  rowsAffected: Array<number>;
};

export type Expense = {
  ExpenseId: number;
  CategoryId: number;
  Exp_Name: string;
  Amount: number;
  DayDue: number;
};

export type Payment = {
  PaymentId: number;
  ExpenseId: number;
  PaymentDate: Date;
};

export type Category = {
  CategoryId: number;
  CategoryName: string;
};
