import { unlink } from "node:fs/promises";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/image/remove")({
	server: {
		handlers: {
			POST: async (req) => {
				const formData = await req.request.formData();

				const smPath = formData.get("smPath") as string;
				await unlink(smPath);

				const mdPath = formData.get("mdPath") as string;
				await unlink(mdPath);

				const lgPath = formData.get("lgPath") as string;
				await unlink(lgPath);

				return Response.json({ message: "success" });
			},
		},
	},
});
