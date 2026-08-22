import { and, eq } from "drizzle-orm";
import { db } from "#/db/index.ts";
import { tlgCommentImageMap } from "#/db/schema.ts";

const create = async (props: { commentId: number; imageId: number }) => {
	return (await db.insert(tlgCommentImageMap).values(props).returning())[0];
};

const remove = async (props: { commentId: number; imageId: number }) => {
	return await db
		.delete(tlgCommentImageMap)
		.where(
			and(
				eq(tlgCommentImageMap.commentId, props.commentId),
				eq(tlgCommentImageMap.imageId, props.imageId),
			),
		)
		.returning();
};

const list = async (props: { commentId: number }) => {
	return await db
		.select()
		.from(tlgCommentImageMap)
		.where(eq(tlgCommentImageMap.commentId, props.commentId));
};

export const tlgCommentImageMapServer = {
	create,
	remove,
	list,
};
