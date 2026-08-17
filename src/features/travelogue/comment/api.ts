import { orpc } from "#/orpc/client.ts";

export const travelogueCommentApi = {
	create: orpc.travelogueCommentRoute.create,
	list: orpc.travelogueCommentRoute.list,
	update: orpc.travelogueCommentRoute.update,
	remove: orpc.travelogueCommentRoute.remove,
	get: orpc.travelogueCommentRoute.get,
};
