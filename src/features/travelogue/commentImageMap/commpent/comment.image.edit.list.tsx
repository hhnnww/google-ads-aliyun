import { useQuery } from "@tanstack/react-query";
import { AttachmentGroup } from "#/components/ui/attachment.tsx";
import { Spinner } from "#/components/ui/spinner.tsx";
import { travelogueCommentImageMapApi } from "#/features/travelogue/commentImageMap/api.ts";
import { CommentImageView } from "#/features/travelogue/commentImageMap/commpent/comment.image.view.tsx";

export const CommentImageEditList = (props: {
	travelogueCommentId: number;
}) => {
	const imageQuery = useQuery(
		travelogueCommentImageMapApi.list.queryOptions({
			input: { travelogueCommentId: props.travelogueCommentId },
		}),
	);
	if (!imageQuery.data) {
		return <Spinner />;
	}
	return (
		<AttachmentGroup className="flex-wrap">
			{imageQuery.data.map((item) => (
				<CommentImageView key={item.id} commentImageMap={item} />
			))}
		</AttachmentGroup>
	);
};
