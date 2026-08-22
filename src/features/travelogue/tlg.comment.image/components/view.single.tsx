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
import { orpc } from "#/orpc/client.ts";

export const TlgCommentImageMapViewSingle = (props: {
	imageId: number;
	commentId: number;
}) => {
	const imageQuery = useQuery(
		orpc.imageRouter.get.queryOptions({ input: { imageId: props.imageId } }),
	);

	const queryClient = useQueryClient();

	const imageRemoveMutation = useMutation(
		orpc.imageRouter.remove.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries(
					orpc.tlgCommentImageMapRouter.list.queryOptions({
						input: { commentId: props.commentId },
					}),
				);
			},
		}),
	);

	const commentImageMapRemoveMutation = useMutation(
		orpc.tlgCommentImageMapRouter.remove.mutationOptions({
			onSuccess: async () => {
				await imageRemoveMutation.mutateAsync({ id: props.imageId });
			},
		}),
	);

	return (
		<Attachment orientation={"vertical"}>
			<AttachmentMedia variant={"image"}>
				<img src={imageQuery.data?.smUrl} alt={imageQuery.data?.alt} />
			</AttachmentMedia>

			<AttachmentContent>
				<AttachmentTitle>{imageQuery.data?.alt || "图片附件"}</AttachmentTitle>
				<AttachmentDescription>
					{imageQuery.data?.lgSizeStr}
				</AttachmentDescription>
			</AttachmentContent>

			<AttachmentActions>
				<AttachmentAction
					onClick={() =>
						commentImageMapRemoveMutation.mutateAsync({
							commentId: props.commentId,
							imageId: props.imageId,
						})
					}
				>
					<XIcon />
				</AttachmentAction>
			</AttachmentActions>
		</Attachment>
	);
};
