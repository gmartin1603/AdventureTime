import type { Context } from "../types/dataAccess.ts";
import BudgetDbContext from "../types/dbContext.ts";
import env from "../Env.json" with { type: "json" };

const config = env.dbConfig;
const client = new BudgetDbContext();

const db: Context = await client.connectToDatabase(config);

async function getTableSchemas() {
  // Get all database tables
  const result = await client.query(
    db,
    `
  SELECT
      table_name,
      column_name,
      data_type
  FROM
      information_schema.columns
  WHERE
      table_schema = 'dbo';
`,
  );

  const tables: { [key: string]: { [key: string]: string } } = {};

  result.recordset.forEach((row) => {
    const { table_name, column_name, data_type } = row;

    const tsType = mapToTypeScriptType(data_type);

    if (!tables[table_name]) {
      tables[table_name] = {};
    }
    tables[table_name][column_name] = tsType;
  });

  client.closeDbConnection(db);

  return tables;
}

function mapToTypeScriptType(sqlType: string): string {
  switch (sqlType) {
    case "int":
    case "integer":
    case "bigint":
    case "numeric":
    case "decimal":
    case "real":
      return "number";
    case "varchar":
    case "nvarchar":
    case "text":
    case "char":
      return "string";
    case "boolean":
      return "boolean";
    case "timestamp":
    case "date":
      return "Date";
    default:
      return "any"; // Fallback if type mapping is not found
  }
}

async function generateTypeScriptTypes() {
  const schemas = await getTableSchemas();

  Object.entries(schemas).forEach(([table, columns]) => {
    console.log(`interface ${capitalize(table)} {`);
    Object.entries(columns).forEach(([column, tsType]) => {
      console.log(`    ${column}: ${tsType};`);
    });
    console.log(`}\n`);
  });
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

generateTypeScriptTypes();
