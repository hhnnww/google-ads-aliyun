import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { image, tlgComment } from "#/db/schema.ts";

export const tlgCommentImageMap = sqliteTable("tlg_comment_image_map", {
	commentId: integer("comment_id")
		.notNull()
		.references(() => tlgComment.id, { onDelete: "cascade" }),
	imageId: integer("image_id")
		.notNull()
		.references(() => image.id, { onDelete: "cascade" }),
});
