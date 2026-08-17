import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImageCreateButton } from "#/features/image/components/image.create.button.tsx";
import { travelogueCommentImageMapApi } from "#/features/travelogue/commentImageMap/api.ts";

export const CommentImageCreateButton = (props: {
	travelogueCommentId: number;
}) => {
	const queryClient = useQueryClient();
	const createMutation = useMutation(
		travelogueCommentImageMapApi.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(
					travelogueCommentImageMapApi.list.queryOptions({
						input: {
							travelogueCommentId: props.travelogueCommentId,
						},
					}),
				);
			},
		}),
	);

	return (
		<ImageCreateButton
			onSuccess={async (data) => {
				for (const item of data) {
					await createMutation.mutateAsync({
						imageId: item.id,
						travelogueCommentId: props.travelogueCommentId,
					});
				}
			}}
		/>
	);
};
