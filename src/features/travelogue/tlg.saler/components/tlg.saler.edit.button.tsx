import { useState } from "react";
import { Dialog, DialogTrigger } from "#/components/ui/dialog.tsx";
import { TlgSalerForm } from "#/features/travelogue/tlg.saler/components/tlg.saler.form.tsx";
import type { TlgSalerSelect } from "#/features/travelogue/tlg.saler/schema.ts";

export const TlgSalerEditButton = (props: {
	saler: TlgSalerSelect;
	pageId: number;
}) => {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>编辑</DialogTrigger>

			<TlgSalerForm
				saler={props.saler}
				pageId={props.pageId}
				setClose={() => setOpen(false)}
			/>
		</Dialog>
	);
};
