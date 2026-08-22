import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "#/components/ui/button.tsx";

export const TlgPageBackButton = () => {
	return (
		<Link to="/admin/tlg/page/list">
			<Button>
				<ArrowLeftIcon />
				返回
			</Button>
		</Link>
	);
};
