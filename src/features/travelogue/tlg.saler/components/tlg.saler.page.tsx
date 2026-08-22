import { TlgSalerCreateButton } from "#/features/travelogue/tlg.saler/components/tlg.saler.create.button.tsx";
import { TlgSalerListTable } from "#/features/travelogue/tlg.saler/components/tlg.saler.list.table.tsx";

export const TlgSalerPage = (props: { pageId: number }) => {
	return (
		<>
			<TlgSalerCreateButton pageId={props.pageId} />
			<TlgSalerListTable pageId={props.pageId} />
		</>
	);
};
