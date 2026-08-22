import { and, eq } from "drizzle-orm";
import { db } from "#/db/index.ts";
import { tlgPageImageMap } from "#/db/schema.ts";

const create = async (props: { pageId: number; imageId: number }) => {
	return (await db.insert(tlgPageImageMap).values(props).returning())[0];
};

const remove = async (props: { pageId: number; imageId: number }) => {
	return await db
		.delete(tlgPageImageMap)
		.where(
			and(
				eq(tlgPageImageMap.pageId, props.pageId),
				eq(tlgPageImageMap.imageId, props.imageId),
			),
		)
		.returning();
};

const list = async (props: { pageId: number }) => {
	return await db
		.select()
		.from(tlgPageImageMap)
		.where(eq(tlgPageImageMap.pageId, props.pageId));
};

export const tlgPageImageMapServer = {
	create,
	remove,
	list,
};
