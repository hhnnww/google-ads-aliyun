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
				<div className="py-8 lg:py-12 lg:pt-26 items-start lg:items-center flex flex-col gap-12 justify-between">
					<div className="text-xl font-bold">
						<img
							src="/SVG/logo.svg?sta=12"
							alt=""
							className="w-full lg:w-120"
						/>
					</div>
					<div className="flex flex-row gap-1">
						{menus.map((menu, index) => (
							<Button
								key={index.toString()}
								variant={index === 0 ? "default" : "ghost"}
								className={cn(
									"font-bold",
									"text-(--front-primary) font-serif hover:text-(--front-primary)",
									{
										"font-bold bg-(--front-primary) hover:bg-(--front-primary) text-white hover:text-white":
											index === 0,
									},
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
