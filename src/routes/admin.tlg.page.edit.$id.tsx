import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Button } from "#/components/ui/button.tsx";

export const Route = createFileRoute("/admin/tlg/page/edit/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();
	const pageId = Number(params.id);
	return (
		<>
			<div className="">
				<Link
					to="/admin/tlg/page/edit/$id/main"
					params={{ id: pageId.toString() }}
				>
					{(active) => (
						<Button variant={active.isActive ? "default" : "ghost"}>
							页面编辑
						</Button>
					)}
				</Link>

				<Link
					to="/admin/tlg/page/edit/$id/saler"
					params={{ id: pageId.toString() }}
				>
					{(active) => (
						<Button variant={active.isActive ? "default" : "ghost"}>
							销售编辑
						</Button>
					)}
				</Link>
			</div>
			<Outlet />
		</>
	);
}
