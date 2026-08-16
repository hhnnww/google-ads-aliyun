import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col gap-20 items-start container mx-auto py-20">
			<Outlet />
		</div>
	);
}
