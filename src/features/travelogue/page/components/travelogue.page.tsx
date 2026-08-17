import { useQuery } from "@tanstack/react-query";
import { Spinner } from "#/components/ui/spinner.tsx";
import { traveloguePageApi } from "#/features/travelogue/page/api.ts";
import { TraveloguePageCreateButton } from "#/features/travelogue/page/components/travelogue.page.create.button.tsx";
import { TraveloguePageListTable } from "#/features/travelogue/page/components/travelogue.page.list.table.tsx";

export const TraveloguePage = () => {
	const pagesQuery = useQuery(traveloguePageApi.list.queryOptions());

	if (!pagesQuery.data) {
		return <Spinner />;
	}

	return (
		<>
			<TraveloguePageCreateButton />
			<TraveloguePageListTable pages={pagesQuery.data} />
		</>
	);
};
