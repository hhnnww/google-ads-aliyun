import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import {
	Attachment,
	AttachmentAction,
	AttachmentActions,
	AttachmentContent,
	AttachmentDescription,
	AttachmentMedia,
	AttachmentTitle,
} from "#/components/ui/attachment.tsx";
import { Spinner } from "#/components/ui/spinner.tsx";
import { imageApi } from "#/features/image/api.ts";
import { traveloguePageImageMapApi } from "#/features/travelogue/pageImageMap/api.ts";
import type { TraveloguePageImageMapSelect } from "#/features/travelogue/pageImageMap/schema.ts";

export const PageImageView = (props: {
	pageImageMap: TraveloguePageImageMapSelect;
}) => {
	const queryClient = useQueryClient();

	const removeMutation = useMutation(
		traveloguePageImageMapApi.remove.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(
					traveloguePageImageMapApi.list.queryOptions({
						input: { traveloguePageId: props.pageImageMap.traveloguePageId },
					}),
				);
			},
		}),
	);

	const imageQuery = useQuery(
		imageApi.get.queryOptions({
			input: { imageId: props.pageImageMap.imageId },
		}),
	);

	if (!imageQuery.data) {
		return <Spinner />;
	}

	return (
		<Attachment orientation={"vertical"}>
			<AttachmentMedia variant={"image"}>
				<img src={imageQuery.data.url} alt={imageQuery.data.alt} />
			</AttachmentMedia>

			<AttachmentContent>
				<AttachmentTitle>{imageQuery.data.alt || "no title"}</AttachmentTitle>
				<AttachmentDescription>{imageQuery.data.sizeStr}</AttachmentDescription>
			</AttachmentContent>

			<AttachmentActions>
				<AttachmentAction
					onClick={async () => {
						await removeMutation.mutateAsync(props.pageImageMap);
					}}
				>
					<XIcon />
				</AttachmentAction>
			</AttachmentActions>
		</Attachment>
	);
};
