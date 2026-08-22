import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "#/components/ui/dialog.tsx";
import type { TlgSalerSelect } from "#/features/travelogue/tlg.saler/schema.ts";
import { useAppForm } from "#/hooks/form.tsx";
import { orpc } from "#/orpc/client.ts";

export const TlgSalerForm = (props: {
	saler: TlgSalerSelect;
	pageId: number;
	setClose: () => void;
}) => {
	const queryClient = useQueryClient();
	const udpateMutation = useMutation(
		orpc.tlgSalerRouter.update.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(
					orpc.tlgSalerRouter.list.queryOptions({
						input: { pageId: props.pageId },
					}),
				);
				props.setClose();
			},
		}),
	);
	const form = useAppForm({
		defaultValues: props.saler,
		onSubmit: async (data) => {
			await udpateMutation.mutateAsync(data.value);
		},
	});

	return (
		<DialogContent className="sm:max-w-3xl">
			<DialogHeader>
				<DialogTitle>编辑销售</DialogTitle>
				<DialogDescription>编辑销售信息</DialogDescription>
			</DialogHeader>
			<form.AppForm>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit(e);
					}}
				>
					<div className="flex flex-col gap-4 p-10">
						<form.AppField name="avatar">
							{(field) => <field.avatar />}
						</form.AppField>

						<form.AppField name="name">
							{(field) => <field.input />}
						</form.AppField>

						<form.AppField name="phone">
							{(field) => <field.input />}
						</form.AppField>

						<form.AppField name="wechat">
							{(field) => <field.input />}
						</form.AppField>

						<form.AppField name="wechatQrcode">
							{(field) => <field.image />}
						</form.AppField>
					</div>
				</form>

				<DialogFooter>
					<form.submitButton />
				</DialogFooter>
			</form.AppForm>
		</DialogContent>
	);
};
