import { createFileRoute } from "@tanstack/react-router";
import { TlgPage } from "#/features/travelogue/tlg.page/components/tlg.page.tsx";

export const Route = createFileRoute("/admin/tlg/page/list")({
	component: RouteComponent,
});

function RouteComponent() {
	return <TlgPage />;
}
