import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "#/components/ui/button.tsx";
import { imageApi } from "#/features/image/api.ts";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const imageListQuery = useQuery(
		imageApi.list.queryOptions({ input: { pageNum: 1, pageSize: 10 } }),
	);
	return (
		<div className="p-10 flex flex-col gap-10 items-start">
			<Button>西藏域龙旅行社</Button>
			<img
				src="/uploads/2026/8/1786856459819-8123495.webp"
				alt="西藏域龙旅行社"
			/>
			{JSON.stringify(imageListQuery.data)}
		</div>
	);
}
