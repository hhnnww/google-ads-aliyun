import { useQuery } from "@tanstack/react-query";
import { AttachmentGroup } from "#/components/ui/attachment.tsx";
import { Spinner } from "#/components/ui/spinner.tsx";
import { traveloguePageImageMapApi } from "#/features/travelogue/pageImageMap/api.ts";
import { PageImageView } from "#/features/travelogue/pageImageMap/commpent/page.image.view.tsx";

export const PageImageEditList = (props: { traveloguePageId: number }) => {
	const imageQuery = useQuery(
		traveloguePageImageMapApi.list.queryOptions({
			input: { traveloguePageId: props.traveloguePageId },
		}),
	);
	if (!imageQuery.data) {
		return <Spinner />;
	}
	return (
		<AttachmentGroup className="flex-wrap">
			{imageQuery.data.map((item) => (
				<PageImageView key={item.id} pageImageMap={item} />
			))}
		</AttachmentGroup>
	);
};
