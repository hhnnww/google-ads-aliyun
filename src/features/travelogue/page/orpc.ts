import { type InferRouterOutputs, os } from "@orpc/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "#/db/index.ts";
import { traveloguePage } from "#/db/schema.ts";
import { imageServers } from "#/features/image/server.ts";
import { traveloguepageselectSchema } from "#/features/travelogue/page/schema.ts";
import { faker } from "#/lib/faker.ts";

const create = os.handler(async () => {
	return await db.insert(traveloguePage).values({
		title: "",
		content: "",
		author: faker.randomCNName(),
		like: faker.randomNumber(10, 100),
		dayAgo: faker.randomNumber(10, 20),
	});
});

const list = os.handler(async () => {
	return await db
		.select()
		.from(traveloguePage)
		.orderBy(desc(traveloguePage.id));
});

const update = os.input(traveloguepageselectSchema).handler(async (ctx) => {
	return await db
		.update(traveloguePage)
		.set(ctx.input)
		.where(eq(traveloguePage.id, ctx.input.id))
		.returning();
});

const remove = os
	.input(z.object({ traveloguePageId: z.number() }))
	.handler(async (ctx) => {
		const pageQuery = (
			await db
				.select()
				.from(traveloguePage)
				.where(eq(traveloguePage.id, ctx.input.traveloguePageId))
		)[0];
		if (pageQuery.avatar) {
			await imageServers.removeWithDB(pageQuery.avatar);
		}
		return await db
			.delete(traveloguePage)
			.where(eq(traveloguePage.id, ctx.input.traveloguePageId))
			.returning();
	});

const get = os
	.input(z.object({ traveloguePageId: z.number() }))
	.handler(async (ctx) => {
		const res = await db
			.select()
			.from(traveloguePage)
			.where(eq(traveloguePage.id, ctx.input.traveloguePageId))
			.limit(1);
		return res[0];
	});

export const traveloguePageRoute = {
	create,
	list,
	update,
	remove,
	get,
};

export type TraveloguePageRouter = {
	create: InferRouterOutputs<typeof create>;
	list: InferRouterOutputs<typeof list>;
	update: InferRouterOutputs<typeof update>;
	remove: InferRouterOutputs<typeof remove>;
	get: InferRouterOutputs<typeof get>;
};
