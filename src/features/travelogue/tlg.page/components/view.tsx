import { SquarePen } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button.tsx";
import { Dialog, DialogTrigger } from "#/components/ui/dialog.tsx";
import { AdminContentView } from "#/features/admin/components/admin.content.view.tsx";
import { TlgPageForm } from "#/features/travelogue/tlg.page/components/tlg.page.form.tsx";
import type { TlgPageRouterTypes } from "#/features/travelogue/tlg.page/orpc.ts";
import { TlgPageImageMapViewList } from "#/features/travelogue/tlg.page.image.map/components/view.list.tsx";

export const TlgPageView = (props: {
	pageSelect: TlgPageRouterTypes["get"];
}) => {
	const [open, setOpen] = useState(false);

	return (
		<AdminContentView
			cardTitle={"编辑游记"}
			author={props.pageSelect.author}
			title={props.pageSelect.title}
			content={props.pageSelect.content}
			dayAgo={props.pageSelect.dayAgo || 0}
			like={props.pageSelect.like || 0}
			imageMapList={<TlgPageImageMapViewList pageId={props.pageSelect.id} />}
			avatarId={props.pageSelect.avatar || 0}
			footer={
				<div className="flex gap-4 items-center flex-col">
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger>
							<Button>
								<SquarePen />
								编辑
							</Button>
						</DialogTrigger>

						<TlgPageForm
							pageSelect={props.pageSelect}
							close={() => setOpen(false)}
						/>
					</Dialog>
				</div>
			}
		/>
	);
};
