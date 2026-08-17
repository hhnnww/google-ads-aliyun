import { os } from "@orpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "#/db/index.ts";
import { travelogueCommentImageMap } from "#/db/schema.ts";
import { imageRemoveFn } from "#/features/image/orpc.ts";

export const create = os
	.input(
		z.object({
			travelogueCommentId: z.number(),
			imageId: z.number(),
		}),
	)
	.handler(async (ctx) => {
		return await db.insert(travelogueCommentImageMap).values(ctx.input);
	});

export const remove = os
	.input(
		z.object({
			travelogueCommentId: z.number(),
			imageId: z.number(),
		}),
	)
	.handler(async (ctx) => {
		const result = await db
			.delete(travelogueCommentImageMap)
			.where(
				and(
					eq(
						travelogueCommentImageMap.travelogueCommentId,
						ctx.input.travelogueCommentId,
					),
					eq(travelogueCommentImageMap.imageId, ctx.input.imageId),
				),
			)
			.returning();
		await imageRemoveFn(ctx.input.imageId);
		return result;
	});

export const list = os
	.input(
		z.object({
			travelogueCommentId: z.number(),
		}),
	)
	.handler(async (ctx) => {
		return await db
			.select()
			.from(travelogueCommentImageMap)
			.where(
				eq(
					travelogueCommentImageMap.travelogueCommentId,
					ctx.input.travelogueCommentId,
				),
			);
	});

export const travelogueCommentImageMapRoute = {
	create,
	remove,
	list,
};
