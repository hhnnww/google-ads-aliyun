import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "#/components/ui/button.tsx";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "#/components/ui/dialog.tsx";
import { Spinner } from "#/components/ui/spinner.tsx";
import type { TravelogueCommentSelect } from "#/db/schema.ts";
import { travelogueCommentApi } from "#/features/travelogue/comment/api.ts";
import { travelogueCommentImageMapApi } from "#/features/travelogue/commentImageMap/api.ts";
import { CommentImageCreateButton } from "#/features/travelogue/commentImageMap/commpent/comment.image.create.button.tsx";
import { CommentImageEditList } from "#/features/travelogue/commentImageMap/commpent/comment.image.edit.list.tsx";
import { useAppForm } from "#/hooks/form.tsx";

export const TravelogueCommentEditForm = (props: {
	travelogueComment: TravelogueCommentSelect;
	onSuccess: () => void;
}) => {
	const queryClient = useQueryClient();
	const updateMutation = useMutation(
		travelogueCommentApi.update.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(
					travelogueCommentApi.list.queryOptions({
						input: {
							traveloguePageId: props.travelogueComment.traveloguePageId,
						},
					}),
				);
				props.onSuccess();
			},
		}),
	);

	const form = useAppForm({
		defaultValues: props.travelogueComment,
		onSubmit: async (ctx) => {
			await updateMutation.mutateAsync(ctx.value);
		},
	});

	const imagesQuery = useQuery(
		travelogueCommentImageMapApi.list.queryOptions({
			input: { travelogueCommentId: props.travelogueComment.id },
		}),
	);

	if (!imagesQuery.data) {
		return <Spinner />;
	}

	return (
		<DialogContent className="sm:max-w-5xl">
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
					className="grid grid-cols-12 gap-6 p-6 max-h-[80vh] overflow-y-auto no-scrollbar"
				>
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
						<CommentImageEditList
							travelogueCommentId={props.travelogueComment.id}
						/>
					</div>
					<div className="col-span-12">
						<CommentImageCreateButton
							travelogueCommentId={props.travelogueComment.id}
						/>
					</div>
				</form>
			</form.AppForm>
			<DialogFooter>
				<form.AppForm>
					<form.submitButton />
					<Button variant={"outline"} onClick={() => props.onSuccess()}>
						取消
					</Button>
				</form.AppForm>
			</DialogFooter>
		</DialogContent>
	);
};
