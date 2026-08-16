import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Button } from "#/components/ui/button.tsx";
import { imageApi } from "#/features/image/api.ts";

export const ImageRemoveButton = (props: { imageId: number }) => {
	const queryClient = useQueryClient();
	const params = useParams({ from: "/admin/image/list/$pagenum" });
	const pagenum = Number(params.pagenum);

	const removeMutation = useMutation(
		imageApi.remove.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(
					imageApi.list.queryOptions({
						input: { pageNum: pagenum },
					}),
				);
			},
		}),
	);
	return (
		<Button
			onClick={async () => {
				await removeMutation.mutateAsync({ id: props.imageId });
			}}
		>
			删除
		</Button>
	);
};
