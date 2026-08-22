import { PageCommentSingle } from "#/features/travelogue/front/components/page.comment.single.tsx";
import { PageTravelogue } from "#/features/travelogue/front/components/page.travelogue.tsx";
import type { TlgPageFrontTypes } from "#/features/travelogue/front/orpc.ts";

export const FrontPage = (props: { page: TlgPageFrontTypes["get"] }) => {
	return (
		<div className="py-12">
			<div className="container-tlg">
				<PageTravelogue page={props.page} />
			</div>

			<div className="bg-[#f9f9f9] py-12 mt-24">
				<div className="flex flex-col gap-6 container-tlg">
					{props.page.page.comments.map((item) => (
						<PageCommentSingle key={item.id} comment={item} />
					))}
				</div>
			</div>
		</div>
	);
};
