import { sqliteTable } from "drizzle-orm/sqlite-core";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";
import type { z } from "zod";
import { contentBase } from "#/db/content.base.schema.ts";

export const tlgPage = sqliteTable("tlg_page", {
	...contentBase,
});

export const tlgPageSelectSchema = createSelectSchema(tlgPage);
export const tlgPageInsertSchema = createInsertSchema(tlgPage);
export const tlgPageUpdateSchema = createUpdateSchema(tlgPage);

export type TlgPageSelect = z.infer<typeof tlgPageSelectSchema>;
export type TlgPageInsert = z.infer<typeof tlgPageInsertSchema>;
export type TlgPageUpdate = z.infer<typeof tlgPageUpdateSchema>;
