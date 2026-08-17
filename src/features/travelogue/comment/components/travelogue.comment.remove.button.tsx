import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "#/components/ui/button.tsx";
import { travelogueCommentApi } from "#/features/travelogue/comment/api.ts";

export const TravelogueCommentRemoveButton = (props: {
	travelogueCommentId: number;
	traveloguePageId: number;
}) => {
	const queryClient = useQueryClient();

	const removeMutation = useMutation(
		travelogueCommentApi.remove.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(
					travelogueCommentApi.list.queryOptions({
						input: { traveloguePageId: props.traveloguePageId },
					}),
				);
			},
		}),
	);

	return (
		<Button
			variant="ghost"
			onClick={async () => {
				await removeMutation.mutateAsync({
					travelogueCommentId: props.travelogueCommentId,
				});
			}}
		>
			删除
		</Button>
	);
};
