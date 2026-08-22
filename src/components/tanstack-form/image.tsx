import { useQuery } from "@tanstack/react-query";
import { FieldLabel } from "#/components/ui/field.tsx";
import { ImageCreateButton } from "#/features/image/components/image.create.button.tsx";
import { useFieldContext } from "#/hooks/form-context.tsx";
import { orpc } from "#/orpc/client.ts";

export const TanstackImage = () => {
	const field = useFieldContext<number>();

	const imageQuery = useQuery(
		orpc.imageRouter.get.queryOptions({
			input: { imageId: field.state.value },
		}),
	);

	return (
		<div className="flex flex-col gap-2 items-start">
			<FieldLabel>{field.name}</FieldLabel>

			<div className="">
				<img src={imageQuery.data?.smUrl} alt="" className="rounded-md" />
			</div>

			<ImageCreateButton
				onSuccess={(data) => {
					data.forEach((item) => {
						field.handleChange(item.id);
					});
				}}
				label="上传图片"
			/>
		</div>
	);
};
