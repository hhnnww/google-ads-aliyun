import { unlink } from "node:fs/promises";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/image/remove")({
	server: {
		handlers: {
			POST: async (req) => {
				const formData = await req.request.formData();
				const path = formData.get("path") as string;
				await unlink(path);
				return Response.json({ message: "success" });
			},
		},
	},
});
