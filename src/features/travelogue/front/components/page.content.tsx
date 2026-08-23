import reactStringReplace from "react-string-replace";
import { TlgPageSaler } from "#/features/travelogue/front/components/page.saler.tsx";
import type { TlgPageFrontTypes } from "#/features/travelogue/front/orpc.ts";

export const PageContent = (props: {
	content: string;
	saler: TlgPageFrontTypes["get"]["activeSaler"];
}) => {
	const result = reactStringReplace(props.content, /\$saler/g, (_, index) => (
		<TlgPageSaler saler={props.saler} key={index.toString()} />
	));
	return <div className="whitespace-pre-line">{result}</div>;
};
