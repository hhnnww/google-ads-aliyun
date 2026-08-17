import { Link } from "@tanstack/react-router";
import { SquarePenIcon } from "lucide-react";
import { Button } from "#/components/ui/button.tsx";

export const TraveloguePageEditButton = (props: {
	traveloguePageId: number;
}) => {
	return (
		<Button
			render={(buttonProps) => (
				<Link
					to={"/admin/travelogue/page/edit/$pageid/main"}
					params={{ pageid: props.traveloguePageId.toString() }}
					{...buttonProps}
				>
					<SquarePenIcon />
					编辑
				</Link>
			)}
		/>
	);
};
