import { relations } from "drizzle-orm";
import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";
import type { z } from "zod";
import { contentBase } from "#/db/content.base.schema.ts";
import { image } from "#/features/image/schema";
import { traveloguePage } from "#/features/travelogue/page/schema";

export const travelogueComment = sqliteTable("travelogue_comment", {
	...contentBase,

	traveloguePageId: integer("travelogue_page_id")
		.notNull()
		.references(() => traveloguePage.id),
});

export const travelogueCommentInsertSchema =
	createInsertSchema(travelogueComment);
export const travelogueCommentUpdateSchema =
	createUpdateSchema(travelogueComment);
export const travelogueCommentSelectSchema =
	createSelectSchema(travelogueComment);

export type TravelogueCommentSelect = z.infer<
	typeof travelogueCommentSelectSchema
>;
export type TravelogueCommentInsert = z.infer<
	typeof travelogueCommentInsertSchema
>;
export type TravelogueCommentUpdate = z.infer<
	typeof travelogueCommentUpdateSchema
>;

export const travelogueCommentRelations = relations(
	travelogueComment,
	({ one }) => ({
		traveloguePage: one(traveloguePage, {
			fields: [travelogueComment.traveloguePageId],
			references: [traveloguePage.id],
		}),
		avatarObj: one(image, {
			fields: [travelogueComment.avatar],
			references: [image.id],
		}),
	}),
);
