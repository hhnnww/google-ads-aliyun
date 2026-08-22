import { type InferRouterOutputs, os } from "@orpc/server";
import { z } from "zod";
import { tlgPageSelectSchema } from "#/features/travelogue/tlg.page/schema.ts";
import { tlgPageServer } from "#/features/travelogue/tlg.page/server.ts";

const create = os.handler(async () => {
	return tlgPageServer.create();
});

const update = os.input(tlgPageSelectSchema).handler(async (ctx) => {
	return tlgPageServer.update(ctx.input);
});

const get = os.input(z.object({ pageId: z.number() })).handler(async (ctx) => {
	return tlgPageServer.get(ctx.input.pageId);
});

const remove = os
	.input(z.object({ pageId: z.number() }))
	.handler(async (ctx) => {
		return tlgPageServer.remove(ctx.input.pageId);
	});

const list = os.handler(async () => {
	return tlgPageServer.list();
});

export const tlgPageRouter = {
	create,
	update,
	get,
	remove,
	list,
};

export type TlgPageRouterTypes = {
	create: InferRouterOutputs<typeof create>;
	update: InferRouterOutputs<typeof update>;
	get: InferRouterOutputs<typeof get>;
	remove: InferRouterOutputs<typeof remove>;
	list: InferRouterOutputs<typeof list>;
};
