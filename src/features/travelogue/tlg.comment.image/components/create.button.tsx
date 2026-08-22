import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImageCreateButton } from "#/features/image/components/image.create.button.tsx";
import { orpc } from "#/orpc/client.ts";

export const TlgCommentImageMapCreateButton = (props: {
	commentId: number;
}) => {
	const queryClient = useQueryClient();
	const createMutation = useMutation(
		orpc.tlgCommentImageMapRouter.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(
					orpc.tlgCommentImageMapRouter.list.queryOptions({
						input: { commentId: props.commentId },
					}),
				);
			},
		}),
	);
	return (
		<ImageCreateButton
			onSuccess={async (data) => {
				data.forEach(async (item) => {
					await createMutation.mutateAsync({
						commentId: props.commentId,
						imageId: item.id,
					});
				});
			}}
		/>
	);
};
