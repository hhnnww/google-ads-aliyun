export const PageContent = (props: { content: string }) => {
	return (
		<div className="whitespace-pre-line leading-loose">{props.content}</div>
	);
};
