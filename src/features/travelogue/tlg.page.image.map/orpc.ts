import { type InferRouterOutputs, os } from "@orpc/server";
import { z } from "zod";
import { tlgPageImageMapServer } from "#/features/travelogue/tlg.page.image.map/server.ts";

const create = os
	.input(z.object({ pageId: z.number(), imageId: z.number() }))
	.handler(async (ctx) => {
		return tlgPageImageMapServer.create(ctx.input);
	});

const remove = os
	.input(z.object({ pageId: z.number(), imageId: z.number() }))
	.handler(async (ctx) => {
		return tlgPageImageMapServer.remove(ctx.input);
	});

const list = os.input(z.object({ pageId: z.number() })).handler(async (ctx) => {
	return tlgPageImageMapServer.list(ctx.input);
});

export const tlgPageImageMapRouter = {
	create,
	remove,
	list,
};

export type TlgPageImageMapRouterTypes = {
	create: InferRouterOutputs<typeof create>;
	remove: InferRouterOutputs<typeof remove>;
	list: InferRouterOutputs<typeof list>;
};
