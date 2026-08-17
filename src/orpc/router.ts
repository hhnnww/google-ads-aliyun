import { imageRouter } from "#/features/image/orpc.ts";
import { travelogueCommentRoute } from "#/features/travelogue/comment/orpc.ts";
import { travelogueCommentImageMapRoute } from "#/features/travelogue/commentImageMap/orpc.ts";
import { traveloguePageRoute } from "#/features/travelogue/page/orpc.ts";
import { traveloguePageImageMapRoute } from "#/features/travelogue/pageImageMap/orpc.ts";

export default {
	imageRouter,
	traveloguePageRoute,
	travelogueCommentRoute,
	traveloguePageImageMapRoute,
	travelogueCommentImageMapRoute,
};
