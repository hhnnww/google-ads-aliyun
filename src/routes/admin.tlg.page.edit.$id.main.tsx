import { createFileRoute } from "@tanstack/react-router";
import { TlgPageEdit } from "#/features/travelogue/tlg.page/components/tlg.page.edit.page.tsx";

export const Route = createFileRoute("/admin/tlg/page/edit/$id/main")({
	component: RouteComponent,
});

function RouteComponent() {
	return <TlgPageEdit />;
}
