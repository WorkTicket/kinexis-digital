import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const migration = readFileSync(resolve(root, "migrations/0002_conferbot_lead_intel.sql"), "utf8");

export function openConferbotLedger() {
  const sqlite = new DatabaseSync(":memory:");
  sqlite.exec(migration);
  return {
    sqlite,
    async batch(statements) {
      sqlite.exec("BEGIN IMMEDIATE");
      try {
        const results = statements.map((statement) => {
          const prepared = sqlite.prepare(statement.sql);
          const keyword = statement.sql.trim().slice(0, 6).toLowerCase();
          if (keyword.startsWith("select")) {
            const rows = prepared.all(...statement.params);
            return { changes: 0, rows };
          }
          const info = prepared.run(...statement.params);
          return { changes: Number(info.changes), rows: [] };
        });
        sqlite.exec("COMMIT");
        return results;
      } catch (error) {
        sqlite.exec("ROLLBACK");
        throw error;
      }
    },
  };
}
