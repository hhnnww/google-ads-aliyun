import type { ReactNode } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card.tsx";
import { PublicAvatar } from "#/features/public.components/public.avatar.tsx";

export const AdminContentView = (props: {
	title?: string;
	content: string;
	author: string;
	dayAgo: number;
	like: number;
	footer: ReactNode;
	imageMapList: ReactNode;
	cardTitle: string;
	avatarId: number;
}) => {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>{props.cardTitle}</CardTitle>
			</CardHeader>

			<CardContent>
				<div className="flex flex-col gap-4 items-start w-full min-w-0">
					{props.title && <h2 className="text-2xl font-bold">{props.title}</h2>}
					<PublicAvatar avatarId={props.avatarId} />
					<div className="flex flex-row gap-2 text-sm">
						<div className="">作者: {props.author}</div>
						<div className="">发布时间: {props.dayAgo}天前</div>
						<div className="">点赞数: {props.like}</div>
					</div>
					<div className="whitespace-pre-wrap text-base">{props.content}</div>

					<div className="">{props.imageMapList}</div>
				</div>
			</CardContent>

			<CardFooter>{props.footer}</CardFooter>
		</Card>
	);
};
