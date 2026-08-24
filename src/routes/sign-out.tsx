import { createFileRoute, redirect } from "@tanstack/react-router";
import { orpc } from "#/orpc/client.ts";

export const Route = createFileRoute("/sign-out")({
	beforeLoad: async () => {
		await orpc.authRoute.signOut.call();
		throw redirect({ to: "/sign-in" });
	},
});
