import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { Button } from "#/components/ui/button.tsx";
import { orpc } from "#/orpc/client.ts";

export const TlgSalerCreateButton = (props: { pageId: number }) => {
	const queryClient = useQueryClient();

	const createMutation = useMutation(
		orpc.tlgSalerRouter.create.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(
					orpc.tlgSalerRouter.list.queryOptions({
						input: { pageId: props.pageId },
					}),
				);
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
			创建
		</Button>
	);
};
