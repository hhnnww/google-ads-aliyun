import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import { Button } from "#/components/ui/button.tsx";
import { orpc } from "#/orpc/client.ts";

export const TlgCommentRemoveButton = (props: {
	commentId: number;
	pageId: number;
}) => {
	const queryClient = useQueryClient();
	const removeMutation = useMutation(
		orpc.tlgCommentRouter.remove.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(
					orpc.tlgCommentRouter.list.queryOptions({
						input: { pageId: props.pageId },
					}),
				);
			},
		}),
	);
	return (
		<Button
			onClick={async () => {
				if (confirm("确认删除吗？")) {
					await removeMutation.mutateAsync({ id: props.commentId });
				}
			}}
			variant={"outline"}
		>
			<Trash2Icon />
			删除
		</Button>
	);
};
