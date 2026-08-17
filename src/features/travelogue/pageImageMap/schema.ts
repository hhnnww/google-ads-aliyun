import { relations } from "drizzle-orm";
import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";
import type { z } from "zod";
import { image } from "#/features/image/schema";
import { traveloguePage } from "#/features/travelogue/page/schema";

export const traveloguePageImageMap = sqliteTable("travelogue_page_image_map", {
	id: integer({ mode: "number" }).primaryKey({
		autoIncrement: true,
	}),
	traveloguePageId: integer("travelogue_page_id")
		.notNull()
		.references(() => traveloguePage.id),
	imageId: integer("image_id")
		.notNull()
		.references(() => image.id),
});

export const traveloguePageImageMapInsertSchema = createInsertSchema(
	traveloguePageImageMap,
);
export const traveloguePageImageMapUpdateSchema = createUpdateSchema(
	traveloguePageImageMap,
);
export const traveloguePageImageMapSelectSchema = createSelectSchema(
	traveloguePageImageMap,
);

export type TraveloguePageImageMapSelect = z.infer<
	typeof traveloguePageImageMapSelectSchema
>;
export type TraveloguePageImageMapInsert = z.infer<
	typeof traveloguePageImageMapInsertSchema
>;
export type TraveloguePageImageMapUpdate = z.infer<
	typeof traveloguePageImageMapUpdateSchema
>;

export const traveloguePageImageMapRelations = relations(
	traveloguePageImageMap,
	({ one }) => ({
		traveloguePage: one(traveloguePage, {
			fields: [traveloguePageImageMap.traveloguePageId],
			references: [traveloguePage.id],
		}),
		image: one(image, {
			fields: [traveloguePageImageMap.imageId],
			references: [image.id],
		}),
	}),
);
