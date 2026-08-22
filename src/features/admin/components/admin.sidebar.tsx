import { Link, linkOptions } from "@tanstack/react-router";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "#/components/ui/sidebar.tsx";

export const AdminSidebar = () => {
	const menus = [
		{
			name: "游记管理",
			link: linkOptions({
				to: "/admin/tlg/page/list",
			}),
		},

		{
			name: "图片管理",
			link: linkOptions({
				to: "/admin/image/list/$pagenum",
				params: { pagenum: "1" },
			}),
		},
	];
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>后台</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{menus.map((menu) => (
								<SidebarMenuItem key={menu.name}>
									<Link {...menu.link}>
										{(active) => (
											<SidebarMenuButton isActive={active.isActive}>
												{menu.name}
											</SidebarMenuButton>
										)}
									</Link>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
};
