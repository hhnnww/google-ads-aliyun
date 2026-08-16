import fs from "node:fs";
import { os } from "@orpc/server";
import { desc } from "drizzle-orm";
import sharp from "sharp"; // 修正点 1：使用默认导入
import { z } from "zod";
import { db } from "#/db/index.ts";
import { image } from "#/db/schema.ts";
import { convertSize } from "#/lib/convertSize.ts";
import { faker } from "#/lib/faker.ts";

const create = os
	.input(
		z.object({
			file: z.instanceof(Blob),
			maxWidth: z.number().default(1200),
		}),
	)
	.handler(async (ctx) => {
		const { file, maxWidth } = ctx.input;

		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		const nowMs = Date.now();
		const randomNum = faker.randomNumber(1000000, 9999999);
		const year = new Date().getFullYear();
		const month = new Date().getMonth() + 1;
		const uploadPath = `./public/uploads/${year}/${month}`;
		// 如果图片父文件夹不存在
		if (!fs.existsSync(uploadPath)) {
			await fs.promises.mkdir(uploadPath, { recursive: true });
		}
		const uploadPathWithFileName = `${uploadPath}/${nowMs}-${randomNum}.webp`;
		const url = `/uploads/${year}/${month}/${nowMs}-${randomNum}.webp`;
		const webpBuffer = await sharp(buffer)
			.resize({
				width: maxWidth,
				withoutEnlargement: true,
			})
			.webp({ quality: 80 })
			.toBuffer();

		await fs.promises.writeFile(uploadPathWithFileName, webpBuffer);

		return await db
			.insert(image)
			.values({
				alt: "",
				size: webpBuffer.length,
				sizeStr: convertSize(webpBuffer.length),
				url: url,
			})
			.returning();
	});

export const list = os
	.input(
		z.object({
			pageNum: z.number().default(1),
			pageSize: z.number().default(10),
		}),
	)
	.handler(async (ctx) => {
		const { pageNum, pageSize } = ctx.input;
		return await db
			.select()
			.from(image)
			.orderBy(desc(image.id))
			.offset((pageNum - 1) * pageSize)
			.limit(pageSize);
	});

export const imageRouter = {
	create,
	list,
};
