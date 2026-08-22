import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { Button } from "#/components/ui/button.tsx";
import { orpc } from "#/orpc/client.ts";

export const TlgPageCreateButton = () => {
	const navigate = useNavigate();
	const createMutation = useMutation(
		orpc.tlgPageRouter.create.mutationOptions({
			onSuccess: (data) => {
				navigate({
					to: "/admin/tlg/page/edit/$id/main",
					params: { id: data.id.toString() },
				});
			},
		}),
	);

	return (
		<Button onClick={async () => await createMutation.mutateAsync({})}>
			<PlusIcon />
			创建游记
		</Button>
	);
};
