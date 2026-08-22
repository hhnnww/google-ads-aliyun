import { TlgPageCreateButton } from "#/features/travelogue/tlg.page/components/tlg.page.create.button.tsx";
import { TlgPageListTable } from "#/features/travelogue/tlg.page/components/tlg.pagelist.table.tsx";

export const TlgPage = () => {
	return (
		<>
			<TlgPageCreateButton />
			<TlgPageListTable />
		</>
	);
};
