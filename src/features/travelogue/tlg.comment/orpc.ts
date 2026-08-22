import { type InferRouterOutputs, os } from "@orpc/server";
import { z } from "zod";
import { tlgCommentSelectSchema } from "#/features/travelogue/tlg.comment/schema.ts";
import { tlgCommentServer } from "#/features/travelogue/tlg.comment/server.ts";

const create = os
	.input(z.object({ pageId: z.number() }))
	.handler(async (ctx) => {
		return tlgCommentServer.create(ctx.input);
	});

const update = os.input(tlgCommentSelectSchema).handler(async (ctx) => {
	return tlgCommentServer.update(ctx.input);
});

const get = os.input(z.object({ id: z.number() })).handler(async (ctx) => {
	return tlgCommentServer.get(ctx.input.id);
});

const remove = os.input(z.object({ id: z.number() })).handler(async (ctx) => {
	return tlgCommentServer.remove(ctx.input.id);
});

const list = os
	.input(
		z.object({
			pageId: z.number(),
		}),
	)
	.handler(async (ctx) => {
		return tlgCommentServer.list({ pageId: ctx.input.pageId });
	});

export const tlgCommentRouter = {
	create,
	update,
	get,
	remove,
	list,
};

export type TlgCommentRouterTypes = {
	create: InferRouterOutputs<typeof create>;
	update: InferRouterOutputs<typeof update>;
	get: InferRouterOutputs<typeof get>;
	remove: InferRouterOutputs<typeof remove>;
	list: InferRouterOutputs<typeof list>;
};
