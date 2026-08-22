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

				const smBuffer = await sharp(fileBuffer)
					.resize({ width: 300, withoutEnlargement: true })
					.webp({ quality: 80 })
					.toBuffer();
				const smFileName = `${baseName}-sm.webp`;
				await writeFile(`${uploadPath}/${smFileName}`, smBuffer);
				const smRel = `/uploads/${year}/${month}/${smFileName}`;

				const mdBuffer = await sharp(fileBuffer)
					.resize({ width: 600, withoutEnlargement: true })
					.webp({ quality: 80 })
					.toBuffer();
				const mdFileName = `${baseName}-md.webp`;
				await writeFile(`${uploadPath}/${mdFileName}`, mdBuffer);
				const mdRel = `/uploads/${year}/${month}/${mdFileName}`;

				const lgBuffer = await sharp(fileBuffer)
					.resize({ width: 1200, withoutEnlargement: true })
					.webp({ quality: 80 })
					.toBuffer();
				const lgFileName = `${baseName}-lg.webp`;
				await writeFile(`${uploadPath}/${lgFileName}`, lgBuffer);
				const lgRel = `/uploads/${year}/${month}/${lgFileName}`;

				const result = {
					alt: "",
					smSize: smBuffer.length,
					mdSize: mdBuffer.length,
					lgSize: lgBuffer.length,
					smSizeStr: convertSize(smBuffer.length),
					mdSizeStr: convertSize(mdBuffer.length),
					lgSizeStr: convertSize(lgBuffer.length),

					smPath: `${UPLOAD_ROOT}${smRel}`,
					smUrl: `${BASE_URL}${smRel}`,
					mdPath: `${UPLOAD_ROOT}${mdRel}`,
					mdUrl: `${BASE_URL}${mdRel}`,
					lgPath: `${UPLOAD_ROOT}${lgRel}`,
					lgUrl: `${BASE_URL}${lgRel}`,
				};

				return Response.json(result);
			},
		},
	},
});
