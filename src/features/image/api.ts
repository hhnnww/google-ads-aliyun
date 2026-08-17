import { orpc } from "#/orpc/client.ts";

export const imageApi = {
	list: orpc.imageRouter.list,
	create: orpc.imageRouter.create,
	remove: orpc.imageRouter.remove,
	get: orpc.imageRouter.get,
};
