import { mkdir, writeFile } from "node:fs/promises";
import { createFileRoute } from "@tanstack/react-router";
import sharp from "sharp";
import { convertSize } from "#/lib/convertSize.ts";
import { faker } from "#/lib/faker.ts";

const BASE_URL = "https://inxizang.com";
const UPLOAD_ROOT = "/wwwroot/storage/uploads";

export const Route = createFileRoute("/image/upload")({
	server: {
		handlers: {
			POST: async (req) => {
				const sizeList = [
					{ name: "sm", maxWidth: 300 },
					{ name: "md", maxWidth: 600 },
					{ name: "lg", maxWidth: 1200 },
				];

				const formData = await req.request.formData();
				const file = formData.get("file") as File;
				if (!file) {
					return new Response("file is required", { status: 400 });
				}

				const now = new Date();
				const year = now.getFullYear();
				const month = now.getMonth() + 1;
				const baseName = `${Date.now()}-${faker.randomNumber(1000000, 9999999)}`;

				const uploadPath = `${UPLOAD_ROOT}/${year}/${month}`;
				await mkdir(uploadPath, { recursive: true });

				const fileBuffer = Buffer.from(await file.arrayBuffer());
				const result: Record<string, string | number> = {};

				let totalSize = 0;

				for (const { name, maxWidth } of sizeList) {
					const fileName = `${baseName}-${name}.webp`;
					const buffer = await sharp(fileBuffer)
						.resize({ width: maxWidth, withoutEnlargement: true })
						.webp({ quality: 80 })
						.toBuffer();

					const filePath = `${uploadPath}/${fileName}`;
					await writeFile(filePath, buffer);

					const relativePath = `/uploads/${year}/${month}/${fileName}`;
					result[`${name}Path`] = `${UPLOAD_ROOT}${relativePath}`;
					result[`${name}Url`] = `${BASE_URL}${relativePath}`;

					if (name === "lg") {
						totalSize = buffer.length;
					}
				}

				result.alt = "";
				result.size = totalSize;
				result.sizeStr = convertSize(totalSize);

				return Response.json(result);
			},
		},
	},
});
