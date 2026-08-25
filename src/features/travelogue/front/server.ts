import { and, eq } from "drizzle-orm";
import { db } from "#/db/index.ts";
import { tlgPage, tlgSaler } from "#/db/schema.ts";

const get = async (pageId: number) => {
	const tlgPageResult = await db.query.tlgPage.findFirst({
		where: eq(tlgPage.id, pageId),
		with: {
			avatarObj: true,
			images: {
				with: { imageObj: true },
			},
			comments: {
				with: {
					images: {
						with: { imageObj: true },
					},
					avatarObj: true,
				},
			},
		},
	});

	const salerResult = await db.query.tlgSaler.findMany({
		where: and(eq(tlgSaler.pageId, pageId), eq(tlgSaler.state, true)),
		with: {
			wechatQrcodeObj: true,
			avatarObj: true,
		},
	});

	const activeSaler = salerResult[0];

	if (!tlgPageResult || !activeSaler) {
		throw new Error("page not found");
	}

	return {
		page: tlgPageResult,
		activeSaler,
		salers: salerResult,
	};
};

export const frontServer = {
	get,
};
