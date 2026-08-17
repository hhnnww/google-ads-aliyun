import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button.tsx";

export const TravelogueCommentEditButton = (props: {
	travelogueCommentId: number;
}) => {
	return (
		<Button
			render={(buttonProps) => (
				<Link
					to={"/admin/travelogue/comment/edit/$commentid/main"}
					params={{ commentid: props.travelogueCommentId.toString() }}
					{...buttonProps}
				>
					编辑
				</Link>
			)}
		/>
	);
};
