import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "#/components/ui/button.tsx";
import { traveloguePageApi } from "#/features/travelogue/page/api.ts";

export const TraveloguePageCreateButton = () => {
	const queryClient = useQueryClient();
	const createMutation = useMutation(
		traveloguePageApi.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(traveloguePageApi.list.queryOptions());
			},
		}),
	);

	return (
		<Button onClick={async () => await createMutation.mutateAsync({})}>
			创建
		</Button>
	);
};
