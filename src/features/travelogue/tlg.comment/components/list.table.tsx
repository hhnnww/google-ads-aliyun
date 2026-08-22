import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "#/components/ui/card.tsx";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table.tsx";
import { TlgCommentEditButton } from "#/features/travelogue/tlg.comment/components/edit.button.tsx";
import { orpc } from "#/orpc/client.ts";

export const TlgCommentListTable = () => {
	const listQuery = useQuery(orpc.tlgCommentRouter.list.queryOptions());
	return (
		<Card className="w-full">
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>Author</TableHead>
							<TableHead className="w-full">Content</TableHead>
							<TableHead>操作</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{listQuery.data?.map((item) => (
							<TableRow key={item.id}>
								<TableCell>{item.id}</TableCell>
								<TableCell>{item.author || "匿名"}</TableCell>
								<TableCell>
									{item.content ? item.content.slice(0, 50) : "无内容"}
								</TableCell>
								<TableCell>
									<TlgCommentEditButton id={item.id} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};
