import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "#/components/ui/button.tsx";
import { orpc } from "#/orpc/client.ts";

export const TlgSalerToggleButton = (props: {
	salerId: number;
	currentState: boolean;
	pageId: number;
}) => {
	const queryClient = useQueryClient();
	const toggleMutation = useMutation(
		orpc.tlgSalerRouter.toggle.mutationOptions({
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
			variant={props.currentState ? "default" : "ghost"}
			onClick={async () =>
				await toggleMutation.mutateAsync({
					salerId: props.salerId,
					currentState: props.currentState,
				})
			}
		>
			{props.currentState ? "关闭" : "开启"}
		</Button>
	);
};
