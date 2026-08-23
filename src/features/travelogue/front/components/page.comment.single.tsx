import { PageAuthor } from "#/features/travelogue/front/components/page.author.tsx";
import { PageContent } from "#/features/travelogue/front/components/page.content.tsx";
import { TlgPageImages } from "#/features/travelogue/front/components/page.images.tsx";
import { TlgPageLike } from "#/features/travelogue/front/components/page.like.tsx";
import type { TlgPageFrontTypes } from "#/features/travelogue/front/orpc.ts";

export const PageCommentSingle = (props: {
	comment: TlgPageFrontTypes["get"]["page"]["comments"][0];
	saler: TlgPageFrontTypes["get"]["activeSaler"];
}) => {
	return (
		<div className="flex flex-col gap-6 bg-white p-6 lg:p-12 rounded-md border border-[#f1f1f1]">
			<PageAuthor
				avatarObj={props.comment.avatarObj}
				authorName={props.comment.author}
				dayAgo={props.comment.dayAgo}
			/>
			<PageContent content={props.comment.content} saler={props.saler} />
			<TlgPageImages
				images={props.comment.images.map((item) => item.imageObj)}
			/>
			<TlgPageLike like={props.comment.like} />
		</div>
	);
};
