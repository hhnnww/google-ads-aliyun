import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "#/components/ui/card.tsx";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table.tsx";
import { PublicAvatar } from "#/features/public.components/public.avatar.tsx";
import { TlgSalerEditButton } from "#/features/travelogue/tlg.saler/components/tlg.saler.edit.button.tsx";
import { TlgSalerToggleButton } from "#/features/travelogue/tlg.saler/components/tlg.saler.toggle.button.tsx";
import { orpc } from "#/orpc/client.ts";

export const TlgSalerListTable = (props: { pageId: number }) => {
	const salerListQuery = useQuery(
		orpc.tlgSalerRouter.list.queryOptions({ input: { pageId: props.pageId } }),
	);

	return (
		<Card className="w-full">
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>姓名</TableHead>
							<TableHead>头像</TableHead>
							<TableHead>手机号</TableHead>
							<TableHead>微信号</TableHead>
							<TableHead>微信二维码</TableHead>
							<TableHead>操作</TableHead>
							<TableHead>状态</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{salerListQuery.data?.map((item) => {
							return (
								<TableRow key={item.id}>
									<TableCell>{item.id}</TableCell>
									<TableCell>{item.name}</TableCell>
									<TableCell>
										{item.avatar ? (
											<PublicAvatar avatarId={item.avatar} />
										) : null}
									</TableCell>
									<TableCell>{item.phone}</TableCell>
									<TableCell>{item.wechat}</TableCell>
									<TableCell>{item.wechatQrcode}</TableCell>
									<TableCell>
										<TlgSalerEditButton saler={item} pageId={props.pageId} />
									</TableCell>
									<TableCell>
										<TlgSalerToggleButton
											salerId={item.id}
											currentState={item.state || false}
											pageId={props.pageId}
										/>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};
