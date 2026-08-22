import { relations } from "drizzle-orm";

import { image } from "#/features/image/schema";
import { tlgComment } from "#/features/travelogue/tlg.comment/schema";
import { tlgCommentImageMap } from "#/features/travelogue/tlg.comment.image/schema";
import { tlgPage } from "#/features/travelogue/tlg.page/schema";
import { tlgPageImageMap } from "#/features/travelogue/tlg.page.image.map/schema";

/**
 * tlgPage
 */
export const tlgPageRelations = relations(tlgPage, ({ one, many }) => ({
	avatarObj: one(image, {
		fields: [tlgPage.avatar],
		references: [image.id],
	}),

	images: many(tlgPageImageMap),

	comments: many(tlgComment),
}));

/**
 * tlgComment
 */
export const tlgCommentRelations = relations(tlgComment, ({ one, many }) => ({
	avatarObj: one(image, {
		fields: [tlgComment.avatar],
		references: [image.id],
	}),

	tlgPageObj: one(tlgPage, {
		fields: [tlgComment.pageId],
		references: [tlgPage.id],
	}),

	images: many(tlgCommentImageMap),
}));

/**
 * image
 */
export const imageRelations = relations(image, ({ many }) => ({
	tlgPages: many(tlgPageImageMap),

	tlgComments: many(tlgCommentImageMap),
}));

/**
 * tlgPageImageMap
 */
export const tlgPageImageMapRelations = relations(
	tlgPageImageMap,
	({ one }) => ({
		tlgPageObj: one(tlgPage, {
			fields: [tlgPageImageMap.pageId],
			references: [tlgPage.id],
		}),

		imageObj: one(image, {
			fields: [tlgPageImageMap.imageId],
			references: [image.id],
		}),
	}),
);

/**
 * tlgCommentImageMap
 */
export const tlgCommentImageMapRelations = relations(
	tlgCommentImageMap,
	({ one }) => ({
		tlgCommentObj: one(tlgComment, {
			fields: [tlgCommentImageMap.commentId],
			references: [tlgComment.id],
		}),

		imageObj: one(image, {
			fields: [tlgCommentImageMap.imageId],
			references: [image.id],
		}),
	}),
);
