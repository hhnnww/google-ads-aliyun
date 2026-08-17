import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { Button } from "#/components/ui/button.tsx";
import { travelogueCommentApi } from "#/features/travelogue/comment/api.ts";

export const TravelogueCommentCreateButton = (props: {
	traveloguePageId: number;
}) => {
	const queryClient = useQueryClient();
	const createMutation = useMutation(
		travelogueCommentApi.create.mutationOptions({
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
			onClick={async () =>
				await createMutation.mutateAsync({
					traveloguePageId: props.traveloguePageId,
				})
			}
		>
			<PlusIcon />
			添加评论
		</Button>
	);
};
