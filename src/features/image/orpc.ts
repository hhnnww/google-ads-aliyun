import fs from "node:fs";
import path from "node:path";
import { type InferRouterOutputs, os } from "@orpc/server";
import { desc, eq } from "drizzle-orm";
import sharp from "sharp"; // 修正点 1：使用默认导入
import { z } from "zod";
import { db } from "#/db/index.ts";
import { image } from "#/db/schema.ts";
import { convertSize } from "#/lib/convertSize.ts";
import { faker } from "#/lib/faker.ts";

export const create = os
	.input(
		z.object({
			files: z.array(z.instanceof(File)),
			maxWidth: z.number().default(1200),
		}),
	)
	.handler(async (ctx) => {
		const { files, maxWidth } = ctx.input;
		const insertValues = [];
		const now = new Date();
		const baseStorageDir =
			process.env.NODE_ENV === "production"
				? "/wwwroot/inxizang.com/storage/uploads"
				: path.join(process.cwd(), "public", "uploads");

		const uploadPath = `${baseStorageDir}/${now.getFullYear()}/${now.getMonth() + 1}`;

		if (!fs.existsSync(uploadPath)) {
			await fs.promises.mkdir(uploadPath, { recursive: true });
		}

		for (const file of files) {
			const fileName = `${Date.now()}-${faker.randomNumber(1000000, 9999999)}.webp`;
			const url = `/uploads/${now.getFullYear()}/${now.getMonth() + 1}/${fileName}`;
			const webpBuffer = await sharp(Buffer.from(await file.arrayBuffer()))
				.resize({ width: maxWidth, withoutEnlargement: true })
				.webp({ quality: 80 })
				.toBuffer();

			await fs.promises.writeFile(`${uploadPath}/${fileName}`, webpBuffer);
			insertValues.push({
				alt: "",
				size: webpBuffer.length,
				sizeStr: convertSize(webpBuffer.length),
				url,
			});
		}

		return await db.insert(image).values(insertValues).returning();
	});

export const list = os
	.input(
		z.object({
			pageNum: z.number().default(1),
		}),
	)
	.handler(async (ctx) => {
		const { pageNum } = ctx.input;
		const pageSize = 20;
		return await db
			.select()
			.from(image)
			.orderBy(desc(image.id))
			.offset((pageNum - 1) * pageSize)
			.limit(pageSize);
	});

const remove = os.input(z.object({ id: z.number() })).handler(async (ctx) => {
	const { id } = ctx.input;
	const imageObj = await db.select().from(image).where(eq(image.id, id));
	const baseStorageDir =
		process.env.NODE_ENV === "production"
			? "/wwwroot/inxizang.com/storage"
			: path.join(process.cwd(), "public");
	const imagePath = `${baseStorageDir}${imageObj[0].url}`;

	await fs.promises.unlink(imagePath);
	return await db.delete(image).where(eq(image.id, id)).returning();
});

export const imageRouter = {
	create,
	list,
	remove,
};

export type ImageRouter = {
	create: InferRouterOutputs<typeof create>;
	list: InferRouterOutputs<typeof list>;
	remove: InferRouterOutputs<typeof remove>;
};
