import { orpc } from "#/orpc/client.ts";

export const travelogueCommentImageMapApi = {
	create: orpc.travelogueCommentImageMapRoute.create,
	remove: orpc.travelogueCommentImageMapRoute.remove,
	list: orpc.travelogueCommentImageMapRoute.list,
};
