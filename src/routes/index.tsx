import { createFileRoute } from "@tanstack/react-router";
import { Button } from "#/components/ui/button.tsx";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<Button>西藏域龙旅行社</Button>
			<img
				src="/uploads/2026/8/1786856459819-8123495.webp"
				alt="西藏域龙旅行社"
			/>
		</div>
	);
}
