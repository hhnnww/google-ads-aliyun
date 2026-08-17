import { os } from "@orpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "#/db/index.ts";
import { traveloguePageImageMap } from "#/db/schema.ts";
import { imageServers } from "#/features/image/server.ts";

export const create = os
	.input(
		z.object({
			traveloguePageId: z.number(),
			imageId: z.number(),
		}),
	)
	.handler(async (ctx) => {
		return await db.insert(traveloguePageImageMap).values(ctx.input);
	});

export const remove = os
	.input(
		z.object({
			traveloguePageId: z.number(),
			imageId: z.number(),
		}),
	)
	.handler(async (ctx) => {
		const result = await db
			.delete(traveloguePageImageMap)
			.where(
				and(
					eq(
						traveloguePageImageMap.traveloguePageId,
						ctx.input.traveloguePageId,
					),
					eq(traveloguePageImageMap.imageId, ctx.input.imageId),
				),
			)
			.returning();
		await imageServers.removeWithDB(ctx.input.imageId);
		return result;
	});

export const list = os
	.input(
		z.object({
			traveloguePageId: z.number(),
		}),
	)
	.handler(async (ctx) => {
		return await db
			.select()
			.from(traveloguePageImageMap)
			.where(
				eq(traveloguePageImageMap.traveloguePageId, ctx.input.traveloguePageId),
			);
	});

export const traveloguePageImageMapRoute = {
	create,
	remove,
	list,
};
