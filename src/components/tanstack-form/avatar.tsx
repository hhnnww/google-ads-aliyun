import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarImage } from "#/components/ui/avatar.tsx";
import { FieldLabel } from "#/components/ui/field.tsx";
import { ImageCreateButton } from "#/features/image/components/image.create.button.tsx";
import { useFieldContext } from "#/hooks/form-context.tsx";
import { orpc } from "#/orpc/client.ts";

export const TanstackAvatar = () => {
	const field = useFieldContext<number>();

	const imageQuery = useQuery(
		orpc.imageRouter.get.queryOptions({
			input: { imageId: field.state.value },
		}),
	);

	return (
		<div className="flex flex-col gap-2 items-start">
			<FieldLabel>头像</FieldLabel>

			<Avatar size="lg">
				<AvatarImage src={imageQuery.data?.smUrl} />
			</Avatar>

			<ImageCreateButton
				onSuccess={(data) => {
					data.forEach((item) => {
						field.handleChange(item.id);
					});
				}}
				label="替换头像"
			/>
		</div>
	);
};
