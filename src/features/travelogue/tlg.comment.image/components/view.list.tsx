import { useQuery } from "@tanstack/react-query";
import { AttachmentGroup } from "#/components/ui/attachment.tsx";
import { TlgCommentImageMapViewSingle } from "#/features/travelogue/tlg.comment.image/components/view.single.tsx";
import { orpc } from "#/orpc/client.ts";

export const TlgCommentImageMapViewList = (props: { commentId: number }) => {
	const commentImageMapList = useQuery(
		orpc.tlgCommentImageMapRouter.list.queryOptions({
			input: { commentId: props.commentId },
		}),
	);
	return (
		<AttachmentGroup className="w-full">
			{commentImageMapList.data?.map((item) => (
				<TlgCommentImageMapViewSingle
					key={item.imageId.toString()}
					imageId={item.imageId}
					commentId={props.commentId}
				/>
			))}
		</AttachmentGroup>
	);
};
