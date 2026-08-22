import { type InferRouterOutputs, os } from "@orpc/server";
import { z } from "zod";
import { frontServer } from "#/features/travelogue/front/server.ts";

const get = os.input(z.object({ pageId: z.number() })).handler(async (ctx) => {
	return frontServer.get(ctx.input.pageId);
});

export const frontRouter = {
	get,
};

export type TlgPageFrontTypes = {
	get: InferRouterOutputs<typeof get>;
};
