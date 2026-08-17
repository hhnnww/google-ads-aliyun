import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Spinner } from "#/components/ui/spinner.tsx";
import { travelogueCommentApi } from "#/features/travelogue/comment/api.ts";
import { traveloguePageApi } from "#/features/travelogue/page/api.ts";
import { TraveloguePageEdit } from "#/features/travelogue/page/components/travelogue.page.edit.tsx";

export const Route = createFileRoute(
	"/admin/travelogue/page/edit/$pageid/main",
)({
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();
	const pageid = Number(params.pageid);
	const pageQuery = useQuery(
		traveloguePageApi.get.queryOptions({ input: { traveloguePageId: pageid } }),
	);
	const commentsQuery = useQuery(
		travelogueCommentApi.list.queryOptions({
			input: { traveloguePageId: pageid },
		}),
	);

	if (!pageQuery.data || !commentsQuery.data) {
		return <Spinner />;
	}
	return (
		<TraveloguePageEdit
			traveloguePage={pageQuery.data}
			travelogueComments={commentsQuery.data}
		/>
	);
}
