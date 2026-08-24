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
			<DialogTrigger>
				<div className="flex flex-row gap-1 items-end">
					<div className="text-primary font-bold">{props.saler.name}</div>
					<div className="text-sm">(點擊聯繫{props.saler.name})</div>
				</div>
			</DialogTrigger>

			<DialogContent className="sm:max-w-xl">
				<DialogHeader>
					<DialogTitle className="font-bold">
						聯繫顧問{props.saler.name}
					</DialogTitle>
					<DialogDescription>
						您可以通過以下方系，聯繫我們的金牌銷售顧問{props.saler.name}。
					</DialogDescription>
				</DialogHeader>

				<div className="lg:p-8 flex flex-col gap-4 lg:gap-8">
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
