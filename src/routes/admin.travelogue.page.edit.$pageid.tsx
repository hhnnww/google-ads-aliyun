import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/travelogue/page/edit/$pageid")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
