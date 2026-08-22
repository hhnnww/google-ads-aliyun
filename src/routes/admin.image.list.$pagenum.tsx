import { createFileRoute } from "@tanstack/react-router";
import { Image } from "#/features/image/components/image.tsx";

export const Route = createFileRoute("/admin/image/list/$pagenum")({
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();
	const pageNum = Number(params.pagenum);

	return <Image pageNum={pageNum} />;
}
