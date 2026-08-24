import { Avatar, AvatarImage } from "#/components/ui/avatar.tsx";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "#/components/ui/dialog.tsx";
import { TlgPageSalerItem } from "#/features/travelogue/front/components/page.saler.item.tsx";
import { TlgPageSalerWechatQrcode } from "#/features/travelogue/front/components/page.saler.wechatQrcode.tsx";
import type { TlgPageFrontTypes } from "#/features/travelogue/front/orpc.ts";

export const TlgPageSaler = (props: {
	saler: TlgPageFrontTypes["get"]["activeSaler"];
}) => {
	return (
		<Dialog>
			<DialogTrigger
				nativeButton={false}
				render={(triggerProps) => (
					<span
						className="inline-flex flex-row gap-1 items-baseline cursor-pointer break-all wrap-break-word focus-visible:outline-none"
						{...triggerProps}
					>
						<span className="font-bold text-(--front-primary)">
							{props.saler.name}
						</span>
						<span className="text-xs text-[#999999]">
							(點擊聯繫{props.saler.name})
						</span>
					</span>
				)}
			></DialogTrigger>

			<DialogContent className="sm:max-w-xl">
				<DialogHeader className="flex flex-col items-center justify-center pt-4">
					<div className="flex flex-row items-end">
						<img
							src="https://inxizang.com/uploads/2026/8/1787542530057-4882053-lg.webp"
							alt=""
							className="h-18"
						/>
						<div className="pb-3">
							<Avatar size="lg" className="data-[size=lg]:size-16">
								<AvatarImage src={props.saler.avatarObj?.mdUrl} />
							</Avatar>
						</div>

						<img
							src="https://inxizang.com/uploads/2026/8/1787542621479-9140405-lg.webp"
							alt=""
							className="h-18"
						/>
					</div>
					<DialogTitle className="font-bold text-xl text-[#92640C]">
						金牌顧問 {props.saler.name}
					</DialogTitle>
					<DialogDescription>
						您可以通過以下方系，聯繫我們的金牌銷售顧問 {props.saler.name}。
					</DialogDescription>
				</DialogHeader>

				<div className="p-4 lg:p-8 flex flex-col gap-12">
					<TlgPageSalerItem
						title="微信號"
						content={props.saler.wechat}
						buttonLabel="打開微信"
						link="weixin://"
					/>

					<TlgPageSalerItem
						title="手機號"
						content={props.saler.phone}
						buttonLabel="拨打手機號"
						link={`tel:${props.saler.phone}`}
					/>

					<TlgPageSalerWechatQrcode saler={props.saler} />
				</div>
			</DialogContent>
		</Dialog>
	);
};
