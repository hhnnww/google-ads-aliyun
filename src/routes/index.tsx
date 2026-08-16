import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { imageApi } from "#/features/image/api.ts";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const imageListQuery = useQuery(
		imageApi.list.queryOptions({ input: { pageNum: 1, pageSize: 10 } }),
	);
	return (
		<div className="container mx-auto py-20 flex flex-col gap-20 items-start">
			<div className="">tibet travel</div>
			<pre className="">{JSON.stringify(imageListQuery.data, null, 4)}</pre>
		</div>
	);
}
