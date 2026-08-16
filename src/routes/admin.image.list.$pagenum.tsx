import { createFileRoute } from "@tanstack/react-router";
import { Image } from "#/features/image/components/image.tsx";

export const Route = createFileRoute("/admin/image/list/$pagenum")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Image pageNum={1} />;
}
