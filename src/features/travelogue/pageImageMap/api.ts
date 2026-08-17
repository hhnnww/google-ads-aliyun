import { orpc } from "#/orpc/client.ts";

export const traveloguePageImageMapApi = {
	create: orpc.traveloguePageImageMapRoute.create,
	remove: orpc.traveloguePageImageMapRoute.remove,
	list: orpc.traveloguePageImageMapRoute.list,
};
