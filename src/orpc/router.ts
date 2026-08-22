import { imageRouter } from "#/features/image/orpc.ts";
import { frontRouter } from "#/features/travelogue/front/orpc.ts";
import { tlgCommentRouter } from "#/features/travelogue/tlg.comment/orpc.ts";
import { tlgCommentImageMapRouter } from "#/features/travelogue/tlg.comment.image/orpc.ts";
import { tlgPageRouter } from "#/features/travelogue/tlg.page/orpc.ts";
import { tlgPageImageMapRouter } from "#/features/travelogue/tlg.page.image.map/orpc.ts";
import { tlgSalerRouter } from "#/features/travelogue/tlg.saler/orpc.ts";

export default {
	imageRouter,
	frontRouter,
	tlgCommentRouter,
	tlgCommentImageMapRouter,
	tlgPageRouter,
	tlgPageImageMapRouter,
	tlgSalerRouter,
};
