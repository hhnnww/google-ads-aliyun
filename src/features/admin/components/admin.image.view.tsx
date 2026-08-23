import { useQuery } from "@tanstack/react-query";
import { orpc } from "#/orpc/client.ts";

export const AdminImageView = (props: {
	imageId: number;
	className?: string;
}) => {
	const imageQuery = useQuery(
		orpc.imageRouter.get.queryOptions({ input: { imageId: props.imageId } }),
	);

	return (
		imageQuery.data?.smUrl && (
			<div className={props.className}>
				<img src={imageQuery.data?.smUrl} alt="" className="rounded-md" />
			</div>
		)
	);
};
