import fs from "node:fs";
import { type InferRouterOutputs, os } from "@orpc/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "#/db/index.ts";
import { image } from "#/db/schema.ts";
import { imageServers } from "#/features/image/server.ts";

const baseStorageDir =
	process.env.NODE_ENV === "production" ? "/wwwroot/storage" : "public";

export const create = os
	.input(
		z.object({
			files: z.array(z.instanceof(File)),
		}),
	)
	.handler(async (ctx) => {
		const { files } = ctx.input;
		const insertValues = [];
		for (const file of files) {
			const data = await imageServers.create(file);
			insertValues.push(data);
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

export const imageRemoveFn = async (imageId: number) => {
	const imageObj = await db.select().from(image).where(eq(image.id, imageId));
	const imagePath = `${baseStorageDir}${imageObj[0].url}`;

	try {
		await fs.promises.unlink(imagePath);
	} catch (err) {
		console.log(err);
	}
	return await db.delete(image).where(eq(image.id, imageId)).returning();
};

const remove = os.input(z.object({ id: z.number() })).handler(async (ctx) => {
	const { id } = ctx.input;
	return await imageRemoveFn(id);
});

const get = os.input(z.object({ imageId: z.number() })).handler(async (ctx) => {
	const { imageId } = ctx.input;
	return (await db.select().from(image).where(eq(image.id, imageId)))[0];
});

export const imageRouter = {
	create,
	list,
	remove,
	get,
};

export type ImageRouter = {
	create: InferRouterOutputs<typeof create>;
	list: InferRouterOutputs<typeof list>;
	remove: InferRouterOutputs<typeof remove>;
};
