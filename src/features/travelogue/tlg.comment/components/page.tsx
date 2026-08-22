import { useQuery } from "@tanstack/react-query";
import { TlgCommentView } from "#/features/travelogue/tlg.comment/components/view.tsx";
import { orpc } from "#/orpc/client.ts";

export const TlgComment = (props: { pageId: number }) => {
	const commentListQuery = useQuery(
		orpc.tlgCommentRouter.list.queryOptions({
			input: { pageId: props.pageId },
		}),
	);
	return (
		<div className="flex flex-col gap-12 w-full">
			{commentListQuery.data?.map((item) => (
				<TlgCommentView commentSelect={item} key={item.id} />
			))}
		</div>
	);
};
