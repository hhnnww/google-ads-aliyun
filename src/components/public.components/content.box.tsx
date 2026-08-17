type ContentBoxData = {
	id: number;
	author: string;
	avatar: number | null;
	title?: string;
	content: string;
	like: number;
	dayAgo: number;
	createdAt: Date | null;
};

export const ContentBox = (props: { content: ContentBoxData }) => {
	return (
		<div className="flex flex-col gap-6">
			{props.content?.title && (
				<div className="text-2xl font-bold">
					{props.content?.title || "无标题"}
				</div>
			)}

			<div className="flex flex-row gap-12">
				<ContentBoxData label="作者" value={props.content.author || "无作者"} />
				<ContentBoxData label="时间" value={props.content.dayAgo || "无时间"} />
				<ContentBoxData label="点赞" value={props.content.like || "无点赞"} />
			</div>

			<div className="whitespace-pre-line">
				{props.content.content || "无内容"}
			</div>
		</div>
	);
};

const ContentBoxData = (props: { label: string; value: string | number }) => {
	return (
		<div className="">
			<div className="text-xs">{props.label}</div>
			<div className="">{props.value}</div>
		</div>
	);
};
