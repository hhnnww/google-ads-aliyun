import { Avatar, AvatarImage } from "#/components/ui/avatar.tsx";
import type { ImageSelect } from "#/features/image/schema.ts";
import { convertDate } from "#/lib/convert-date.ts";

export const PageAuthor = (props: {
	avatarObj: ImageSelect | null;
	authorName: string;
	dayAgo: number;
}) => {
	return (
		<div className="flex items-center gap-4">
			<Avatar size="default">
				<AvatarImage src={props.avatarObj?.smUrl} />
			</Avatar>

			<div className="">
				<div className="font-bold">{props.authorName}</div>
				<div className="text-xs">發表於 {convertDate(props.dayAgo)}</div>
			</div>
		</div>
	);
};
