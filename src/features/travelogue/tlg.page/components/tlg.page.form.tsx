import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "#/components/ui/button.tsx";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "#/components/ui/dialog.tsx";
import type { TlgPageRouterTypes } from "#/features/travelogue/tlg.page/orpc.ts";
import { TlgPageImageMapCreateButton } from "#/features/travelogue/tlg.page.image.map/components/create.button.tsx";
import { TlgPageImageMapViewList } from "#/features/travelogue/tlg.page.image.map/components/view.list.tsx";
import { useAppForm } from "#/hooks/form.tsx";
import { orpc } from "#/orpc/client.ts";

export const TlgPageForm = (props: {
	pageSelect: TlgPageRouterTypes["create"];
	close: () => void;
}) => {
	const queryClient = useQueryClient();
	const updateMutation = useMutation(
		orpc.tlgPageRouter.update.mutationOptions({
			onSuccess: () => {
				props.close();
				queryClient.invalidateQueries(
					orpc.tlgPageRouter.get.queryOptions({
						input: { pageId: props.pageSelect.id },
					}),
				);
			},
		}),
	);

	const form = useAppForm({
		defaultValues: props.pageSelect,
		onSubmit: async (ctx) => {
			await updateMutation.mutateAsync(ctx.value);
		},
	});

	return (
		<DialogContent className="sm:max-w-3xl">
			<DialogHeader>
				<DialogTitle>编辑页面</DialogTitle>
				<DialogDescription>编辑页面内容</DialogDescription>
			</DialogHeader>
			<form.AppForm>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="w-full"
				>
					<div className="grid grid-cols-12 gap-4 w-full p-8">
						<div className="col-span-12">
							<form.AppField name="avatar">
								{(field) => <field.avatar />}
							</form.AppField>
						</div>

						<div className="col-span-12">
							<form.AppField name="title">
								{(field) => <field.input />}
							</form.AppField>
						</div>

						<div className="col-span-4">
							<form.AppField name="author">
								{(field) => <field.input />}
							</form.AppField>
						</div>

						<div className="col-span-4">
							<form.AppField name="dayAgo">
								{(field) => <field.input type="number" />}
							</form.AppField>
						</div>

						<div className="col-span-4">
							<form.AppField name="like">
								{(field) => <field.input type="number" />}
							</form.AppField>
						</div>

						<div className="col-span-12">
							<form.AppField name="content">
								{(field) => <field.textarea />}
							</form.AppField>
						</div>

						<div className="col-span-12">
							<TlgPageImageMapViewList pageId={props.pageSelect.id} />
						</div>

						<div className="col-span-12">
							<TlgPageImageMapCreateButton pageId={props.pageSelect.id} />
						</div>
					</div>
				</form>

				<DialogFooter>
					<Button onClick={() => props.close()} variant={"outline"}>
						取消
					</Button>
					<form.submitButton />
				</DialogFooter>
			</form.AppForm>
		</DialogContent>
	);
};
