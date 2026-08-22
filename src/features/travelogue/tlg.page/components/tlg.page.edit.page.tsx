import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Spinner } from "#/components/ui/spinner.tsx";
import { TlgCommentCreateButton } from "#/features/travelogue/tlg.comment/components/create.button.tsx";
import { TlgComment } from "#/features/travelogue/tlg.comment/components/page.tsx";
import { TlgPageBackButton } from "#/features/travelogue/tlg.page/components/tlg.page.back.button.tsx";
import { TlgPageView } from "#/features/travelogue/tlg.page/components/view.tsx";
import { orpc } from "#/orpc/client.ts";

export const TlgPageEdit = () => {
	const params = useParams({ from: "/admin/tlg/page/edit/$id/main" });
	const pageId = Number(params.id);
	const pageQuery = useQuery(
		orpc.tlgPageRouter.get.queryOptions({ input: { pageId } }),
	);

	if (!pageQuery.data) {
		return <Spinner />;
	}

	return (
		<>
			<TlgPageBackButton />
			<TlgPageView pageSelect={pageQuery.data} />
			<TlgCommentCreateButton pageId={pageId} />
			<TlgComment pageId={pageId} />
			<TlgCommentCreateButton pageId={pageId} />
		</>
	);
};
