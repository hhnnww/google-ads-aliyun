import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarImage } from "#/components/ui/avatar.tsx";
import { orpc } from "#/orpc/client.ts";

export const PublicAvatar = (props: { avatarId: number }) => {
	const avatarQuery = useQuery(
		orpc.imageRouter.get.queryOptions({ input: { imageId: props.avatarId } }),
	);

	return (
		<Avatar size="lg">
			<AvatarImage src={avatarQuery.data?.smUrl} />
		</Avatar>
	);
};
