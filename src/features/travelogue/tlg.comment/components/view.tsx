import { SquarePen } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button.tsx";
import { Dialog, DialogTrigger } from "#/components/ui/dialog.tsx";
import { AdminContentView } from "#/features/admin/components/admin.content.view.tsx";
import { TlgCommentForm } from "#/features/travelogue/tlg.comment/components/form.tsx";
import { TlgCommentRemoveButton } from "#/features/travelogue/tlg.comment/components/remove.button.tsx";
import type { TlgCommentRouterTypes } from "#/features/travelogue/tlg.comment/orpc.ts";
import { TlgCommentImageMapViewList } from "#/features/travelogue/tlg.comment.image/components/view.list.tsx";

export const TlgCommentView = (props: {
	commentSelect: TlgCommentRouterTypes["get"];
}) => {
	const [open, setOpen] = useState(false);

	return (
		<AdminContentView
			cardTitle={"编辑评论"}
			author={props.commentSelect.author}
			dayAgo={props.commentSelect.dayAgo}
			like={props.commentSelect.like}
			content={props.commentSelect.content}
			avatarId={props.commentSelect.avatar || 0}
			imageMapList={
				<TlgCommentImageMapViewList commentId={props.commentSelect.id} />
			}
			footer={
				<div className="flex flex-row gap-2">
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger>
							<Button>
								<SquarePen />
								编辑
							</Button>
						</DialogTrigger>

						<TlgCommentForm
							commentSelect={props.commentSelect}
							close={() => setOpen(false)}
						/>
					</Dialog>

					<TlgCommentRemoveButton
						commentId={props.commentSelect.id}
						pageId={props.commentSelect.pageId}
					/>
				</div>
			}
		/>
	);
};
