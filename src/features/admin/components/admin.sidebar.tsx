import { Link, linkOptions } from "@tanstack/react-router";
import { ImageIcon, LogOutIcon, PackageIcon } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
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
			name: (
				<>
					<PackageIcon />
					游记管理
				</>
			),
			link: linkOptions({
				to: "/admin/tlg/page/list",
			}),
		},

		{
			name: (
				<>
					<ImageIcon />
					图片管理
				</>
			),
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
					<SidebarGroupLabel>管理后台</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{menus.map((menu, index) => (
								<SidebarMenuItem key={index.toString()}>
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

			<SidebarFooter>
				<SidebarMenuItem>
					<Link to={"/sign-out"} preload={false}>
						<SidebarMenuButton>
							<LogOutIcon />
							退出登录
						</SidebarMenuButton>
					</Link>
				</SidebarMenuItem>
			</SidebarFooter>
		</Sidebar>
	);
};
