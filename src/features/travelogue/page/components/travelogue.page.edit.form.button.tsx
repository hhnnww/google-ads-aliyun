import { SquarePenIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button.tsx";
import { Dialog, DialogTrigger } from "#/components/ui/dialog.tsx";
import type { TraveloguePageSelect } from "#/db/schema.ts";
import { TraveloguePageEditForm } from "#/features/travelogue/page/components/travelogue.page.edit.form.tsx";

export const TraveloguePageEditFormButton = (props: {
	traveloguePage: TraveloguePageSelect;
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

			<TraveloguePageEditForm
				traveloguePage={props.traveloguePage}
				onSuccess={() => setOpen(false)}
			/>
		</Dialog>
	);
};
