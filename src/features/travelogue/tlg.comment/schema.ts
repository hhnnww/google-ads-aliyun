import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";
import type { z } from "zod";
import { contentBase } from "#/db/content.base.schema.ts";
import { tlgPage } from "#/db/schema.ts";

export const tlgComment = sqliteTable("tlg_comment", {
	...contentBase,

	pageId: integer()
		.notNull()
		.references(() => tlgPage.id, { onDelete: "set null" }),
});

export const tlgCommentSelectSchema = createSelectSchema(tlgComment);
export const tlgCommentInsertSchema = createInsertSchema(tlgComment);
export const tlgCommentUpdateSchema = createUpdateSchema(tlgComment);

export type TlgCommentSelect = z.infer<typeof tlgCommentSelectSchema>;
export type TlgCommentInsert = z.infer<typeof tlgCommentInsertSchema>;
export type TlgCommentUpdate = z.infer<typeof tlgCommentUpdateSchema>;
