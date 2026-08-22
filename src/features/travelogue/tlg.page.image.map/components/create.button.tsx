import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImageCreateButton } from "#/features/image/components/image.create.button.tsx";
import { orpc } from "#/orpc/client.ts";

export const TlgPageImageMapCreateButton = (props: { pageId: number }) => {
	const queryClient = useQueryClient();
	const createMutation = useMutation(
		orpc.tlgPageImageMapRouter.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(
					orpc.tlgPageImageMapRouter.list.queryOptions({
						input: { pageId: props.pageId },
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
						pageId: props.pageId,
						imageId: item.id,
					});
				});
			}}
		/>
	);
};
