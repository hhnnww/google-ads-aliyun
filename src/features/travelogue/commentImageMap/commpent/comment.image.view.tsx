import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import {
	Attachment,
	AttachmentAction,
	AttachmentActions,
	AttachmentContent,
	AttachmentDescription,
	AttachmentMedia,
	AttachmentTitle,
} from "#/components/ui/attachment.tsx";
import { Spinner } from "#/components/ui/spinner.tsx";
import { imageApi } from "#/features/image/api.ts";
import { travelogueCommentImageMapApi } from "#/features/travelogue/commentImageMap/api.ts";
import type { TravelogueCommentImageMapSelect } from "#/features/travelogue/commentImageMap/schema.ts";

export const CommentImageView = (props: {
	commentImageMap: TravelogueCommentImageMapSelect;
}) => {
	const queryClient = useQueryClient();

	const removeMutation = useMutation(
		travelogueCommentImageMapApi.remove.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(
					travelogueCommentImageMapApi.list.queryOptions({
						input: {
							travelogueCommentId: props.commentImageMap.travelogueCommentId,
						},
					}),
				);
			},
		}),
	);

	const imageQuery = useQuery(
		imageApi.get.queryOptions({
			input: { imageId: props.commentImageMap.imageId },
		}),
	);

	if (!imageQuery.data) {
		return <Spinner />;
	}

	return (
		<Attachment orientation={"vertical"}>
			<AttachmentMedia variant={"image"}>
				<img src={imageQuery.data.url} alt={imageQuery.data.alt} />
			</AttachmentMedia>

			<AttachmentContent>
				<AttachmentTitle>{imageQuery.data.alt || "no title"}</AttachmentTitle>
				<AttachmentDescription>{imageQuery.data.sizeStr}</AttachmentDescription>
			</AttachmentContent>

			<AttachmentActions>
				<AttachmentAction
					onClick={async () => {
						await removeMutation.mutateAsync(props.commentImageMap);
					}}
				>
					<XIcon />
				</AttachmentAction>
			</AttachmentActions>
		</Attachment>
	);
};
