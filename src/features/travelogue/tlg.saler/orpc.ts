import { type InferRouterOutputs, os } from "@orpc/server";
import { z } from "zod";
import { tlgSalerSelectSchema } from "#/features/travelogue/tlg.saler/schema.ts";
import { tlgSalerServer } from "#/features/travelogue/tlg.saler/server.ts";

const create = os
	.input(z.object({ pageId: z.number() }))
	.handler(async (ctx) => {
		return await tlgSalerServer.create(ctx.input.pageId);
	});

const update = os.input(tlgSalerSelectSchema).handler(async (ctx) => {
	return await tlgSalerServer.update(ctx.input);
});

const remove = os
	.input(z.object({ salerId: z.number() }))
	.handler(async (ctx) => {
		return await tlgSalerServer.remove(ctx.input.salerId);
	});

const list = os.input(z.object({ pageId: z.number() })).handler(async (ctx) => {
	return await tlgSalerServer.list(ctx.input.pageId);
});

const toggle = os
	.input(z.object({ salerId: z.number(), currentState: z.boolean() }))
	.handler(async (ctx) => {
		return await tlgSalerServer.toggle(
			ctx.input.salerId,
			ctx.input.currentState,
		);
	});

export const tlgSalerRouter = {
	create,
	update,
	remove,
	list,
	toggle,
};

export type TlgSalerRouterTypes = {
	create: InferRouterOutputs<typeof create>;
	update: InferRouterOutputs<typeof update>;
	remove: InferRouterOutputs<typeof remove>;
	list: InferRouterOutputs<typeof list>;
	toggle: InferRouterOutputs<typeof toggle>;
};
