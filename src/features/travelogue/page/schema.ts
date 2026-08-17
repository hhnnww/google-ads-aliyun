import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";
import type { z } from "zod";
import { contentBase } from "#/db/content.base.schema.ts";
import { image } from "#/features/image/schema";

export const traveloguePage = sqliteTable("travelogue_page", {
	...contentBase,
	title: text().notNull().default(""),
});

export const traveloguePageInsertSchema = createInsertSchema(traveloguePage);
export const traveloguepageUpdateSchema = createUpdateSchema(traveloguePage);
export const traveloguepageselectSchema = createSelectSchema(traveloguePage);

export type TraveloguePageSelect = z.infer<typeof traveloguepageselectSchema>;
export type TraveloguePageInsert = z.infer<typeof traveloguePageInsertSchema>;
export type TraveloguePageUpdate = z.infer<typeof traveloguepageUpdateSchema>;

export const traveloguePageRelations = relations(traveloguePage, ({ one }) => ({
	avatarObj: one(image, {
		fields: [traveloguePage.avatar],
		references: [image.id],
	}),
}));
