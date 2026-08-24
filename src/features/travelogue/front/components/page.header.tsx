import { BedIcon, MapIcon, PhoneIcon, TvMinimalIcon } from "lucide-react";
import { Button } from "#/components/ui/button.tsx";
import { cn } from "#/lib/utils.ts";

export const TlgPageHeader = () => {
	const menus = [
		<>
			<TvMinimalIcon />
			首頁
		</>,
		<>
			<BedIcon />
			酒店
		</>,
		<>
			<MapIcon />
			行程
		</>,
		<>
			<PhoneIcon />
			聯繫我們
		</>,
	];
	return (
		<div className="">
			<div className="container-tlg">
				<div className="py-8 lg:py-12 items-center flex flex-col gap-10 justify-between">
					<div className="text-xl font-bold">
						<img src="/SVG/logo.svg" alt="" className="w-70 lg:w-120" />
					</div>
					<div className="hidden lg:flex flex-row gap-1">
						{menus.map((menu, index) => (
							<Button
								key={index.toString()}
								variant={index === 0 ? "default" : "ghost"}
								className={cn(
									{
										"font-bold": index === 0,
									},
									"hover:font-bold",
								)}
							>
								{menu}
							</Button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
