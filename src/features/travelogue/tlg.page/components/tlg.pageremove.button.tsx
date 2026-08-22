import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { Button } from "#/components/ui/button.tsx";
import { orpc } from "#/orpc/client.ts";

export const TlgPageRemoveButton = (props: { pageId: number }) => {
	const queryClient = useQueryClient();
	const removeMutation = useMutation(
		orpc.tlgPageRouter.remove.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries(
					orpc.tlgPageRouter.list.queryOptions(),
				);
			},
		}),
	);

	return (
		<Button
			variant={"ghost"}
			onClick={async () => {
				if (confirm("确认删除吗？")) {
					await removeMutation.mutateAsync({ pageId: props.pageId });
				}
			}}
		>
			<TrashIcon />
			删除
		</Button>
	);
};
