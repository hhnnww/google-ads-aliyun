import { createFileRoute } from "@tanstack/react-router";
import { FrontPage } from "#/features/travelogue/front/components/page.tsx";
import { orpc } from "#/orpc/client.ts";

export const Route = createFileRoute("/tlg/page/$id")({
	component: RouteComponent,
	loader: async (ctx) => {
		return ctx.context.queryClient.ensureQueryData(
			orpc.frontRouter.get.queryOptions({
				input: {
					pageId: Number(ctx.params.id),
				},
			}),
		);
	},
});

function RouteComponent() {
	const page = Route.useLoaderData();

	return <FrontPage page={page} />;
}
