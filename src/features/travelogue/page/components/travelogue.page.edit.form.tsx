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
import type { TraveloguePageSelect } from "#/db/schema.ts";
import { traveloguePageApi } from "#/features/travelogue/page/api.ts";
import { traveloguePageImageMapApi } from "#/features/travelogue/pageImageMap/api.ts";
import { PageImageCreateButton } from "#/features/travelogue/pageImageMap/commpent/page.image.create.button.tsx";
import { PageImageEditList } from "#/features/travelogue/pageImageMap/commpent/page.image.edit.list.tsx";
import { useAppForm } from "#/hooks/form.tsx";

export const TraveloguePageEditForm = (props: {
	traveloguePage: TraveloguePageSelect;
	onSuccess: () => void;
}) => {
	const queryClient = useQueryClient();
	const updateMutation = useMutation(
		traveloguePageApi.update.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(
					traveloguePageApi.get.queryOptions({
						input: { traveloguePageId: props.traveloguePage.id },
					}),
				);
				props.onSuccess();
			},
		}),
	);

	const form = useAppForm({
		defaultValues: props.traveloguePage,
		onSubmit: async (ctx) => {
			await updateMutation.mutateAsync(ctx.value);
		},
	});

	const imagesQuery = useQuery(
		traveloguePageImageMapApi.list.queryOptions({
			input: { traveloguePageId: props.traveloguePage.id },
		}),
	);

	if (!imagesQuery.data) {
		return <Spinner />;
	}

	return (
		<DialogContent className="sm:max-w-5xl ">
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
						<form.AppField name="title">
							{(field) => <field.input />}
						</form.AppField>
					</div>

					<div className="col-span-12">
						<form.AppField name="content">
							{(field) => <field.textarea />}
						</form.AppField>
					</div>

					<div className="col-span-12">
						<PageImageEditList traveloguePageId={props.traveloguePage.id} />
					</div>
					<div className="col-span-12">
						<PageImageCreateButton traveloguePageId={props.traveloguePage.id} />
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
