import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "#/components/ui/spinner.tsx";
import { imageApi } from "#/features/image/api.ts";
import { ImageCreateButton } from "#/features/image/components/image.create.button.tsx";
import { ImageListTable } from "#/features/image/components/image.list.table.tsx";
import { ImagePageNavi } from "#/features/image/components/image.page.navi.tsx";

export const Image = (props: { pageNum: number }) => {
	const imagesQuery = useQuery(
		imageApi.list.queryOptions({ input: { pageNum: props.pageNum } }),
	);
	const queryClient = useQueryClient();

	if (!imagesQuery.data) {
		return <Spinner />;
	}

	return (
		<>
			<ImageCreateButton
				onSuccess={() =>
					queryClient.invalidateQueries(
						imageApi.list.queryOptions({ input: { pageNum: props.pageNum } }),
					)
				}
			/>
			<ImagePageNavi currentPage={props.pageNum} />
			<ImageListTable images={imagesQuery.data} />
			<ImagePageNavi currentPage={props.pageNum} />
		</>
	);
};
