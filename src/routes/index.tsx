import { createFileRoute } from "@tanstack/react-router";
import { Button } from "#/components/ui/button.tsx";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<Button>西藏域龙旅行社</Button>
		</div>
	);
}
