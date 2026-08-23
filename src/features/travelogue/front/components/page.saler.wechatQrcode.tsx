import type { TlgPageFrontTypes } from "#/features/travelogue/front/orpc.ts";

export const TlgPageSalerWechatQrcode = (props: {
	saler: TlgPageFrontTypes["get"]["activeSaler"];
}) => {
	return (
		<div className="flex flex-col gap-2">
			<div className="font-bold">微信二维码</div>
			<div className="">
				<img src={props.saler.wechatQrcodeObj?.mdUrl} alt="" />
			</div>
		</div>
	);
};
