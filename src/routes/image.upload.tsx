import { writeFile } from "node:fs/promises";
import { createFileRoute } from "@tanstack/react-router";
import { sharp } from "sharp";
import { convertSize } from "#/lib/convertSize.ts";
import { faker } from "#/lib/faker.ts";

export const Route = createFileRoute("/image/upload")({
	server: {
		handlers: {
			POST: async (req) => {
				const formData = await req.request.formData();
				const file = formData.get("file") as File;
				if (!file) {
					return new Response("file is required", { status: 400 });
				}
				const now = new Date();
				const year = now.getFullYear();
				const month = now.getMonth() + 1;
				const fileName = `${Date.now()}-${faker.randomNumber(1000000, 9999999)}.webp`;

				const uploadPath = `/wwwroot/storage/uploads/${year}/${month}`;
				const url = `https://inxizang.com/uploads/${year}/${month}/${fileName}`;

				const webpBuffer = await sharp(Buffer.from(await file.arrayBuffer()))
					.resize({ width: 1200, withoutEnlargement: true })
					.webp({ quality: 80 })
					.toBuffer();

				await writeFile(`${uploadPath}/${fileName}`, webpBuffer);

				return Response.json({
					alt: "",
					size: webpBuffer.length,
					sizeStr: convertSize(webpBuffer.length),
					url,
				});
			},
		},
	},
});
