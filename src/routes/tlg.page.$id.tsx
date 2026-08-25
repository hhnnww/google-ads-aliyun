import { createFileRoute } from "@tanstack/react-router";
import { FrontPage } from "#/features/travelogue/front/components/page.tsx";
import { orpc } from "#/orpc/client.ts";

export const Route = createFileRoute("/tlg/page/$id")({
	component: RouteComponent,
	loader: async (ctx) => {
		return orpc.frontRouter.get.call({ pageId: Number(ctx.params.id) });
	},

	head: (ctx) => ({
		meta: [
			{
				title: `${ctx.loaderData?.page?.title} - 西藏域龍旅行社` || "",
			},
		],
	}),
});

function RouteComponent() {
	const page = Route.useLoaderData();

	return <FrontPage page={page} />;
}
