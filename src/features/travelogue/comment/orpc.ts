import { type InferRouterOutputs, os } from "@orpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "#/db/index.ts";
import { travelogueComment } from "#/db/schema.ts";
import { imageServers } from "#/features/image/server.ts";
import { travelogueCommentSelectSchema } from "#/features/travelogue/comment/schema.ts";
import { faker } from "#/lib/faker.ts";

const create = os
	.input(z.object({ traveloguePageId: z.number() }))
	.handler(async (ctx) => {
		return await db.insert(travelogueComment).values({
			traveloguePageId: ctx.input.traveloguePageId,
			content: "",
			author: faker.randomCNName(),
			like: faker.randomNumber(0, 50),
			dayAgo: faker.randomNumber(0, 5),
			avatar: null,
		});
	});

const list = os
	.input(z.object({ traveloguePageId: z.number() }))
	.handler(async (ctx) => {
		return await db
			.select()
			.from(travelogueComment)
			.where(
				eq(travelogueComment.traveloguePageId, ctx.input.traveloguePageId),
			);
	});

const update = os.input(travelogueCommentSelectSchema).handler(async (ctx) => {
	return await db
		.update(travelogueComment)
		.set(ctx.input)
		.where(eq(travelogueComment.id, ctx.input.id))
		.returning();
});

const remove = os
	.input(z.object({ travelogueCommentId: z.number() }))
	.handler(async (ctx) => {
		const commentQuery = (
			await db
				.select()
				.from(travelogueComment)
				.where(eq(travelogueComment.id, ctx.input.travelogueCommentId))
		)[0];

		if (commentQuery.avatar) {
			await imageServers.removeWithDB(commentQuery.avatar);
		}

		return await db
			.delete(travelogueComment)
			.where(eq(travelogueComment.id, ctx.input.travelogueCommentId))
			.returning();
	});

const get = os
	.input(z.object({ travelogueCommentId: z.number() }))
	.handler(async (ctx) => {
		const res = await db
			.select()
			.from(travelogueComment)
			.where(eq(travelogueComment.id, ctx.input.travelogueCommentId))
			.limit(1);
		return res[0];
	});

export const travelogueCommentRoute = {
	create,
	list,
	update,
	remove,
	get,
};

export type TravelogueCommentRouter = {
	create: InferRouterOutputs<typeof create>;
	list: InferRouterOutputs<typeof list>;
	update: InferRouterOutputs<typeof update>;
	remove: InferRouterOutputs<typeof remove>;
	get: InferRouterOutputs<typeof get>;
};
