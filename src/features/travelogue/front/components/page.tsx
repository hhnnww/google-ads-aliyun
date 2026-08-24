import { PageCommentSingle } from "#/features/travelogue/front/components/page.comment.single.tsx";
import { TlgPageFooter } from "#/features/travelogue/front/components/page.footer.tsx";
import { TlgPageHeader } from "#/features/travelogue/front/components/page.header.tsx";
import { PageTravelogue } from "#/features/travelogue/front/components/page.travelogue.tsx";
import type { TlgPageFrontTypes } from "#/features/travelogue/front/orpc.ts";

export const FrontPage = (props: { page: TlgPageFrontTypes["get"] }) => {
	return (
		<div className="">
			<TlgPageHeader />

			<div className="container-tlg mt-6 lg:mt-12">
				<PageTravelogue page={props.page} />
			</div>

			<div className="bg-[#f9f9f9] py-6 lg:py-12 mt-6 lg:mt-12">
				<div className="flex flex-col gap-6 container-tlg">
					{props.page.page.comments.map((item) => (
						<PageCommentSingle
							key={item.id}
							comment={item}
							saler={props.page.activeSaler}
						/>
					))}
				</div>
			</div>
			<TlgPageFooter />
		</div>
	);
};
