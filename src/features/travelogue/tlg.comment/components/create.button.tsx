import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { Button } from "#/components/ui/button.tsx";
import { orpc } from "#/orpc/client.ts";

export const TlgCommentCreateButton = (props: { pageId: number }) => {
	const queryClient = useQueryClient();

	const createMutation = useMutation(
		orpc.tlgCommentRouter.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: orpc.tlgCommentRouter.list.queryKey({
						input: { pageId: props.pageId },
					}),
				});
			},
		}),
	);

	return (
		<Button
			onClick={async () =>
				await createMutation.mutateAsync({ pageId: props.pageId })
			}
		>
			<PlusIcon />
			创建评论
		</Button>
	);
};
