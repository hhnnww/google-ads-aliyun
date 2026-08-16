import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const contentBase = sqliteTable("content_base", {
	id: integer({ mode: "number" }).primaryKey({
		autoIncrement: true,
	}),

	title: text().notNull().default(""),
	content: text().notNull().default(""),
	author: text().notNull().default(""),
	like: integer().notNull().default(0),
	dayAgo: integer().notNull().default(0),

	createdAt: integer("created_at", { mode: "timestamp" }).default(
		sql`(unixepoch())`,
	),
});
