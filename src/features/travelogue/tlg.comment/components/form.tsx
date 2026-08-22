import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "#/components/ui/button.tsx";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "#/components/ui/dialog.tsx";
import type { TlgCommentRouterTypes } from "#/features/travelogue/tlg.comment/orpc.ts";
import { TlgCommentImageMapCreateButton } from "#/features/travelogue/tlg.comment.image/components/create.button.tsx";
import { TlgCommentImageMapViewList } from "#/features/travelogue/tlg.comment.image/components/view.list.tsx";
import { useAppForm } from "#/hooks/form.tsx";
import { orpc } from "#/orpc/client.ts";

export const TlgCommentForm = (props: {
	commentSelect: TlgCommentRouterTypes["create"];
	close: () => void;
}) => {
	const queryClient = useQueryClient();
	const updateMutation = useMutation(
		orpc.tlgCommentRouter.update.mutationOptions({
			onSuccess: () => {
				props.close();
				queryClient.invalidateQueries(
					orpc.tlgCommentRouter.list.queryOptions({
						input: {
							pageId: props.commentSelect.pageId as number,
						},
					}),
				);
			},
		}),
	);

	const form = useAppForm({
		defaultValues: props.commentSelect,
		onSubmit: async (ctx) => {
			await updateMutation.mutateAsync(ctx.value);
		},
	});

	return (
		<DialogContent className="sm:max-w-3xl">
			<DialogHeader>
				<DialogTitle>编辑评论</DialogTitle>
				<DialogDescription>编辑评论内容</DialogDescription>
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
							<TlgCommentImageMapViewList commentId={props.commentSelect.id} />
						</div>

						<div className="col-span-12">
							<TlgCommentImageMapCreateButton
								commentId={props.commentSelect.id}
							/>
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
