import { type InferRouterOutputs, os } from "@orpc/server";
import { z } from "zod";
import { tlgCommentImageMapServer } from "#/features/travelogue/tlg.comment.image/server.ts";

const create = os
	.input(z.object({ commentId: z.number(), imageId: z.number() }))
	.handler(async (ctx) => {
		return tlgCommentImageMapServer.create(ctx.input);
	});

const remove = os
	.input(z.object({ commentId: z.number(), imageId: z.number() }))
	.handler(async (ctx) => {
		return tlgCommentImageMapServer.remove(ctx.input);
	});

const list = os
	.input(z.object({ commentId: z.number() }))
	.handler(async (ctx) => {
		return tlgCommentImageMapServer.list(ctx.input);
	});

export const tlgCommentImageMapRouter = {
	create,
	remove,
	list,
};

export type TlgCommentImageMapRouterTypes = {
	create: InferRouterOutputs<typeof create>;
	remove: InferRouterOutputs<typeof remove>;
	list: InferRouterOutputs<typeof list>;
};
