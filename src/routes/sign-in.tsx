import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "#/features/auth/components/sign.in.tsx";
import { createAdminUser } from "#/features/auth/server.ts";

export const Route = createFileRoute("/sign-in")({
	component: RouteComponent,
	beforeLoad: async () => {
		await createAdminUser();
	},
});

function RouteComponent() {
	return <SignIn />;
}
