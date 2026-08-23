import { PageAuthor } from "#/features/travelogue/front/components/page.author.tsx";
import { PageContent } from "#/features/travelogue/front/components/page.content.tsx";
import { TlgPageImages } from "#/features/travelogue/front/components/page.images.tsx";
import { TlgPageLike } from "#/features/travelogue/front/components/page.like.tsx";
import type { TlgPageFrontTypes } from "#/features/travelogue/front/orpc.ts";

export const PageTravelogue = (props: { page: TlgPageFrontTypes["get"] }) => {
	const activeSalerName = props.page.activeSaler.name;
	return (
		<div className="flex flex-col gap-6">
			<h2 className="text-2xl lg:text-3xl font-bold sm:leading-normal lg:leading-relaxed">
				{props.page.page?.title.replaceAll("$saler", activeSalerName)}
			</h2>
			<PageAuthor
				avatarObj={props.page.page.avatarObj}
				authorName={props.page.page.author}
				dayAgo={props.page.page.dayAgo}
			/>
			<PageContent
				content={props.page.page?.content}
				saler={props.page.activeSaler}
			/>
			<TlgPageImages
				images={props.page.page.images.map((item) => item.imageObj)}
			/>
			<TlgPageLike like={props.page.page.like} />
		</div>
	);
};
