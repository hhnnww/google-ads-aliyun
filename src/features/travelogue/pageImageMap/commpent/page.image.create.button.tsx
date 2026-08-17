import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImageCreateButton } from "#/features/image/components/image.create.button.tsx";
import { traveloguePageImageMapApi } from "#/features/travelogue/pageImageMap/api.ts";

export const PageImageCreateButton = (props: { traveloguePageId: number }) => {
	const queryClient = useQueryClient();
	const createMutation = useMutation(
		traveloguePageImageMapApi.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(
					traveloguePageImageMapApi.list.queryOptions({
						input: { traveloguePageId: props.traveloguePageId },
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
						traveloguePageId: props.traveloguePageId,
					});
				}
			}}
		/>
	);
};
