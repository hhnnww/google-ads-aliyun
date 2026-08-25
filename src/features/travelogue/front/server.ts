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

	// 获取当前时间的小时，用这个数字除以salerReslult,得到应该显示在前台的saler
	const currentHour = new Date().getHours();
	const salerIndex = Math.floor(currentHour / salerResult.length);
	const activeSaler = salerResult[salerIndex % salerResult.length];

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
