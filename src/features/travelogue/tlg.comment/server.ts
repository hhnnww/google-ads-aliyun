import { eq } from "drizzle-orm";
import { db } from "#/db/index.ts";
import { tlgComment } from "#/db/schema.ts";
import type { TlgCommentSelect } from "#/features/travelogue/tlg.comment/schema.ts";
import { faker } from "#/lib/faker.ts";

const create = async (props: { pageId: number }) => {
	return (
		await db
			.insert(tlgComment)
			.values({
				author: faker.randomCNName(),
				content: "",
				avatar: null,
				dayAgo: faker.randomNumber(10, 30),
				like: faker.randomNumber(20, 50),
				pageId: props.pageId,
			})
			.returning()
	)[0];
};

const remove = async (id: number) => {
	return await db.delete(tlgComment).where(eq(tlgComment.id, id)).returning();
};

const update = async (data: TlgCommentSelect) => {
	return await db
		.update(tlgComment)
		.set(data)
		.where(eq(tlgComment.id, data.id))
		.returning();
};

const get = async (id: number) => {
	return (
		await db.select().from(tlgComment).where(eq(tlgComment.id, id)).limit(1)
	)[0];
};

const list = async (props: { pageId: number }) => {
	return await db
		.select()
		.from(tlgComment)
		.where(eq(tlgComment.pageId, props.pageId));
};

export const tlgCommentServer = {
	create,
	remove,
	get,
	update,
	list,
};
