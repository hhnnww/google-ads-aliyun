import { createFileRoute } from "@tanstack/react-router";
import { TlgSalerPage } from "#/features/travelogue/tlg.saler/components/tlg.saler.page.tsx";

export const Route = createFileRoute("/admin/tlg/page/edit/$id/saler")({
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();
	const pageId = Number(params.id);
	return <TlgSalerPage pageId={pageId} />;
}
