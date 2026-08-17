import { createFileRoute } from "@tanstack/react-router";
import { TraveloguePage } from "#/features/travelogue/page/components/travelogue.page.tsx";

export const Route = createFileRoute("/admin/travelogue/page/list")({
	component: RouteComponent,
});

function RouteComponent() {
	return <TraveloguePage />;
}
