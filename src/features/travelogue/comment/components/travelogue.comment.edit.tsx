import type { TravelogueCommentSelect } from "#/db/schema.ts";
import { TravelogueCommentView } from "#/features/travelogue/comment/components/travelogue.comment.view.tsx";

export const TravelogueCommentEdit = (props: {
	travelogueComment: TravelogueCommentSelect;
}) => {
	return (
		<>
			<TravelogueCommentView travelogueComment={props.travelogueComment} />
		</>
	);
};
