import { SquarePenIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button.tsx";
import { Dialog, DialogTrigger } from "#/components/ui/dialog.tsx";
import type { TravelogueCommentSelect } from "#/db/schema.ts";
import { TravelogueCommentEditForm } from "#/features/travelogue/comment/components/travelogue.comment.edit.form.tsx";

export const TravelogueCommentEditFormButton = (props: {
	travelogueComment: TravelogueCommentSelect;
}) => {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				render={(triggerProps) => (
					<Button {...triggerProps}>
						<SquarePenIcon />
						编辑
					</Button>
				)}
			/>

			<TravelogueCommentEditForm
				travelogueComment={props.travelogueComment}
				onSuccess={() => setOpen(false)}
			/>
		</Dialog>
	);
};
