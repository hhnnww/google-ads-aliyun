import { orpc } from "#/orpc/client.ts";

export const traveloguePageApi = {
	create: orpc.traveloguePageRoute.create,
	list: orpc.traveloguePageRoute.list,
	update: orpc.traveloguePageRoute.update,
	remove: orpc.traveloguePageRoute.remove,
	get: orpc.traveloguePageRoute.get,
};
