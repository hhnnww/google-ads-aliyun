import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card.tsx";
import type { TravelogueCommentSelect } from "#/db/schema.ts";
import { TravelogueCommentEditFormButton } from "#/features/travelogue/comment/components/travelogue.comment.edit.form.button.tsx";
import { CommentImageEditList } from "#/features/travelogue/commentImageMap/commpent/comment.image.edit.list.tsx";

export const TravelogueCommentView = (props: {
	travelogueComment: TravelogueCommentSelect;
	index: number;
}) => {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>回复 {props.index}</CardTitle>
				<CardDescription>编辑回复</CardDescription>
			</CardHeader>

			<CardContent>
				<div className="whitespace-pre-line">
					{props.travelogueComment.content || "无内容"}
				</div>
				<CommentImageEditList
					travelogueCommentId={props.travelogueComment.id}
				/>
			</CardContent>
			<CardFooter>
				<TravelogueCommentEditFormButton
					travelogueComment={props.travelogueComment}
				/>
			</CardFooter>
		</Card>
	);
};
