import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { image, tlgPage } from "#/db/schema.ts";

export const tlgPageImageMap = sqliteTable("tlg_page_image_map", {
	pageId: integer("page_id")
		.notNull()
		.references(() => tlgPage.id, { onDelete: "cascade" }),
	imageId: integer("image_id")
		.notNull()
		.references(() => image.id, { onDelete: "cascade" }
	),
});
