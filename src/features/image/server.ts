import { eq } from "drizzle-orm";
import { db } from "#/db/index.ts";
import { image } from "#/db/schema.ts";

const getImageUrl = () => {
	console.log(process.env.NODE_ENV);
	if (process.env.NODE_ENV === "development") {
		return "https://inxizang.com";
	}
	return "http://localhost:3000";
};

const create = async (file: File) => {
	const formData = new FormData();
	formData.append("file", file);
	const imageUrl = getImageUrl();
	const uploadUrl = `${imageUrl}/image/upload`;
	const res = await fetch(uploadUrl, {
		method: "POST",
		body: formData,
	});
	const data = (await res.json()) as {
		alt: string;
		size: number;
		sizeStr: string;
		url: string;
		path: string;
	};

	return data;
};

const remove = async (path: string) => {
	const formData = new FormData();
	formData.append("path", path);
	const imageUrl = getImageUrl();
	const removeUrl = `${imageUrl}/image/remove`;
	const res = await fetch(removeUrl, {
		method: "POST",
		body: formData,
	});

	return res.json();
};

const removeWithDB = async (imageId: number) => {
	const imageObj = (
		await db.select().from(image).where(eq(image.id, imageId))
	)[0];
	await imageServers.remove(imageObj.path);
	await db.delete(image).where(eq(image.id, imageId));
};

export const imageServers = { create, remove, removeWithDB };
