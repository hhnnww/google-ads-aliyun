import { useQuery } from "@tanstack/react-query";
import { AttachmentGroup } from "#/components/ui/attachment.tsx";
import { TlgPageImageMapViewSingle } from "#/features/travelogue/tlg.page.image.map/components/view.single.tsx";
import { orpc } from "#/orpc/client.ts";

export const TlgPageImageMapViewList = (props: { pageId: number }) => {
	const pageImageMapList = useQuery(
		orpc.tlgPageImageMapRouter.list.queryOptions({
			input: { pageId: props.pageId },
		}),
	);
	return (
		<AttachmentGroup className="w-full">
			{pageImageMapList.data?.map((item) => (
				<TlgPageImageMapViewSingle
					key={item.imageId.toString()}
					imageId={item.imageId}
					pageId={props.pageId}
				/>
			))}
		</AttachmentGroup>
	);
};
