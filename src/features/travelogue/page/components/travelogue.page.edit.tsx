import type {
	TravelogueCommentSelect,
	TraveloguePageSelect,
} from "#/db/schema.ts";
import { TravelogueCommentCreateButton } from "#/features/travelogue/comment/components/travelogue.comment.create.button.tsx";
import { TravelogueCommentView } from "#/features/travelogue/comment/components/travelogue.comment.view.tsx";
import { TraveloguePageView } from "#/features/travelogue/page/components/travelogue.page.view.tsx";

export const TraveloguePageEdit = (props: {
	traveloguePage: TraveloguePageSelect;
	travelogueComments: TravelogueCommentSelect[];
}) => {
	return (
		<>
			<TraveloguePageView traveloguePage={props.traveloguePage} />
			<TravelogueCommentCreateButton
				traveloguePageId={props.traveloguePage.id}
			/>
			{props.travelogueComments.map((item, index) => (
				<TravelogueCommentView
					key={item.id}
					travelogueComment={item}
					index={index + 1}
				/>
			))}
		</>
	);
};
