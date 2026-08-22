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

	alt: text().notNull().default(""),

	smSize: integer().notNull().default(0),
	smSizeStr: text().notNull().default(""),
	smPath: text().notNull().default(""),
	smUrl: text().notNull().default(""),

	mdSize: integer().notNull().default(0),
	mdSizeStr: text().notNull().default(""),
	mdPath: text().notNull().default(""),
	mdUrl: text().notNull().default(""),

	lgSize: integer().notNull().default(0),
	lgSizeStr: text().notNull().default(""),
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
