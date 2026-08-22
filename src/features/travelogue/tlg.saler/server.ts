import { eq } from "drizzle-orm";
import { db } from "#/db/index.ts";
import { tlgSaler } from "#/db/schema.ts";
import type { TlgSalerSelect } from "#/features/travelogue/tlg.saler/schema.ts";

const create = async (pageId: number) => {
	return await db.insert(tlgSaler).values({ pageId }).returning();
};

const update = async (saler: TlgSalerSelect) => {
	return await db
		.update(tlgSaler)
		.set(saler)
		.where(eq(tlgSaler.id, saler.id))
		.returning();
};

const remove = async (salerId: number) => {
	return await db.delete(tlgSaler).where(eq(tlgSaler.id, salerId)).returning();
};

const list = async (pageId: number) => {
	return await db.select().from(tlgSaler).where(eq(tlgSaler.pageId, pageId));
};

const toggle = async (salerId: number, currentState: boolean) => {
	return await db
		.update(tlgSaler)
		.set({ state: !currentState })
		.where(eq(tlgSaler.id, salerId))
		.returning();
};

export const tlgSalerServer = {
	create,
	update,
	remove,
	list,
	toggle,
};
