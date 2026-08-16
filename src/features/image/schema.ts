import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const image = sqliteTable("image", {
	id: integer().primaryKey({
		autoIncrement: true,
	}),

	url: text().notNull().default(""),
	size: integer().notNull().default(0),
	sizeStr: text().notNull().default(""),
	alt: text().notNull().default(""),

	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
});
