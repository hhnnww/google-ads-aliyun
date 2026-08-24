import type { TlgPageFrontTypes } from "#/features/travelogue/front/orpc.ts";

export const TlgPageSalerWechatQrcode = (props: {
	saler: TlgPageFrontTypes["get"]["activeSaler"];
}) => {
	return (
		<div className=" flex-col gap-2 hidden lg:flex">
			<div className="font-bold">微信二維碼</div>
			<div>
				<img
					src={props.saler.wechatQrcodeObj?.mdUrl}
					alt="微信二維碼"
					className="w-72 rounded-md border"
				/>
			</div>
		</div>
	);
};
