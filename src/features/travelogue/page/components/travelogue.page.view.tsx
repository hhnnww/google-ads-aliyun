import { ContentBox } from "#/components/public.components/content.box.tsx";
import type { TraveloguePageSelect } from "#/db/schema.ts";
import { TraveloguePageEditFormButton } from "#/features/travelogue/page/components/travelogue.page.edit.form.button.tsx";
import { PageImageEditList } from "#/features/travelogue/pageImageMap/commpent/page.image.edit.list.tsx";

export const TraveloguePageView = (props: {
	traveloguePage: TraveloguePageSelect;
}) => {
	return (
		<div className="flex flex-col gap-6 items-start">
			<ContentBox content={props.traveloguePage} />
			<PageImageEditList traveloguePageId={props.traveloguePage.id} />
			<TraveloguePageEditFormButton traveloguePage={props.traveloguePage} />
		</div>
	);
};
