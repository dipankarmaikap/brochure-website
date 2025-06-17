import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Stores ISO timestamp
export const timestamp = {
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString())
    .$onUpdateFn(() => new Date().toISOString()),
};

export const formTable = sqliteTable("form_data", {
  id: integer().primaryKey({ autoIncrement: true }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text().unique().notNull(),
  message: text().notNull(),
  ...timestamp,
});
