import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";
import type { z } from "zod";

export const image = sqliteTable("image", {
	id: integer().primaryKey({
		autoIncrement: true,
	}),

	size: integer().notNull().default(0),
	sizeStr: text().notNull().default(""),
	alt: text().notNull().default(""),

	smPath: text().notNull().default(""),
	smUrl: text().notNull().default(""),
	mdPath: text().notNull().default(""),
	mdUrl: text().notNull().default(""),
	lgPath: text().notNull().default(""),
	lgUrl: text().notNull().default(""),

	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
});

export const imageselectschema = createSelectSchema(image);
export const imageupdatesSchema = createUpdateSchema(image);
export const imageinsertSchema = createInsertSchema(image);

export type ImageSelect = z.infer<typeof imageselectschema>;
export type ImageUpdate = z.infer<typeof imageupdatesSchema>;
export type ImageInsert = z.infer<typeof imageinsertSchema>;
