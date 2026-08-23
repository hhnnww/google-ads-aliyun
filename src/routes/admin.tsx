import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider } from "#/components/ui/sidebar.tsx";
import { AdminSidebar } from "#/features/admin/components/admin.sidebar.tsx";

export const Route = createFileRoute("/admin")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<SidebarProvider>
			<AdminSidebar />
			<div className="flex flex-col gap-20 items-start max-w-250 mx-auto py-20 w-full px-6">
				<Outlet />
			</div>
		</SidebarProvider>
	);
}
