import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
	useRouterState,
} from "@tanstack/react-router";
import { TooltipProvider } from "#/components/ui/tooltip.tsx";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				href: "/SVG/icon.svg",
			},
			{
				rel: "shortcut icon",
				href: "/SVG/icon.svg",
				type: "image/svg+xml",
			},
		],
	}),
	shellComponent: RootDocument,
	notFoundComponent: () => <>404</>,
	errorComponent: (error) => <>{error.error.message}</>,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	let mode = "dark";
	let lang = "en";

	const pathname = useRouterState({
		select: (s) => s.location.pathname,
	});

	if (pathname.startsWith("/tlg/page")) {
		mode = "light";
		lang = "zh-TW";
	}

	return (
		<html lang={lang} className={mode} suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body suppressHydrationWarning>
				<TooltipProvider>{children}</TooltipProvider>

				<Scripts />
			</body>
		</html>
	);
}
