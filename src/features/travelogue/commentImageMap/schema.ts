import { relations } from "drizzle-orm";
import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";
import type { z } from "zod";
import { image } from "#/features/image/schema";
import { travelogueComment } from "#/features/travelogue/comment/schema";

export const travelogueCommentImageMap = sqliteTable(
	"travelogue_comment_image_map",
	{
		id: integer({ mode: "number" }).primaryKey({
			autoIncrement: true,
		}),
		travelogueCommentId: integer("travelogue_comment_id")
			.notNull()
			.references(() => travelogueComment.id),
		imageId: integer("image_id")
			.notNull()
			.references(() => image.id),
	},
);

export const travelogueCommentImageMapInsertSchema = createInsertSchema(
	travelogueCommentImageMap,
);
export const travelogueCommentImageMapUpdateSchema = createUpdateSchema(
	travelogueCommentImageMap,
);
export const travelogueCommentImageMapSelectSchema = createSelectSchema(
	travelogueCommentImageMap,
);

export type TravelogueCommentImageMapSelect = z.infer<
	typeof travelogueCommentImageMapSelectSchema
>;
export type TravelogueCommentImageMapInsert = z.infer<
	typeof travelogueCommentImageMapInsertSchema
>;
export type TravelogueCommentImageMapUpdate = z.infer<
	typeof travelogueCommentImageMapUpdateSchema
>;

export const travelogueCommentImageMapRelations = relations(
	travelogueCommentImageMap,
	({ one }) => ({
		travelogueComment: one(travelogueComment, {
			fields: [travelogueCommentImageMap.travelogueCommentId],
			references: [travelogueComment.id],
		}),
		image: one(image, {
			fields: [travelogueCommentImageMap.imageId],
			references: [image.id],
		}),
	}),
);
