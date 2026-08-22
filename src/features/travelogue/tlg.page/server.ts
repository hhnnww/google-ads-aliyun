import { eq } from "drizzle-orm";
import { db } from "#/db/index.ts";
import { tlgPage } from "#/db/schema.ts";
import type { TlgPageSelect } from "#/features/travelogue/tlg.page/schema.ts";
import { faker } from "#/lib/faker.ts";

const create = async () => {
	return (
		await db
			.insert(tlgPage)
			.values({
				author: faker.randomCNName(),
				content: "",
				avatar: null,
				dayAgo: faker.randomNumber(10, 30),
				like: faker.randomNumber(20, 50),
			})
			.returning()
	)[0];
};

const remove = async (id: number) => {
	return await db.delete(tlgPage).where(eq(tlgPage.id, id)).returning();
};

const update = async (data: TlgPageSelect) => {
	return await db
		.update(tlgPage)
		.set(data)
		.where(eq(tlgPage.id, data.id))
		.returning();
};

const get = async (id: number) => {
	return (
		await db.select().from(tlgPage).where(eq(tlgPage.id, id)).limit(1)
	)[0];
};

const list = async () => {
	return await db.select().from(tlgPage);
};

export const tlgPageServer = {
	create,
	remove,
	get,
	update,
	list,
};
