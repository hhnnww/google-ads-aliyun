import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";
import { image } from "#/db/schema.ts";

export const contentBase = {
	id: integer({ mode: "number" }).primaryKey({
		autoIncrement: true,
	}),

	author: text().notNull().default(""),
	avatar: integer().references(() => image.id),

	content: text().notNull().default(""),

	like: integer().notNull().default(0),
	dayAgo: integer().notNull().default(0),

	createdAt: integer("created_at", { mode: "timestamp" }).default(
		sql`(unixepoch())`,
	),
};
