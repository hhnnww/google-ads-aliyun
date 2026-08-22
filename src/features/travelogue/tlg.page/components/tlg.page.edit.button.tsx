import { Link } from "@tanstack/react-router";
import { SquarePen } from "lucide-react";
import { Button } from "#/components/ui/button.tsx";

export const TlgPageEditButton = (props: { pageId: number }) => {
	return (
		<Link
			to={"/admin/tlg/page/edit/$id/main"}
			params={{ id: props.pageId.toString() }}
		>
			<Button variant={"ghost"}>
				<SquarePen />
				编辑
			</Button>
		</Link>
	);
};
