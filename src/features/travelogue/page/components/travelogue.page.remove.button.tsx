import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { Button } from "#/components/ui/button.tsx";
import { traveloguePageApi } from "#/features/travelogue/page/api.ts";

export const TraveloguePageRemoveButton = (props: {
	traveloguePageId: number;
}) => {
	const queryClient = useQueryClient();

	const removeMutation = useMutation(
		traveloguePageApi.remove.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(traveloguePageApi.list.queryOptions());
			},
		}),
	);

	return (
		<Button
			onClick={async () => {
				await removeMutation.mutateAsync({
					traveloguePageId: props.traveloguePageId,
				});
			}}
		>
			<TrashIcon />
			删除
		</Button>
	);
};
