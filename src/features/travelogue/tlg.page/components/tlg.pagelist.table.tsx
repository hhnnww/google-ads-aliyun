import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { EyeIcon } from "lucide-react";
import { Button } from "#/components/ui/button.tsx";
import { Card, CardContent } from "#/components/ui/card.tsx";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table.tsx";
import { TlgPageEditButton } from "#/features/travelogue/tlg.page/components/tlg.page.edit.button.tsx";
import { TlgPageRemoveButton } from "#/features/travelogue/tlg.page/components/tlg.pageremove.button.tsx";
import { orpc } from "#/orpc/client.ts";

export const TlgPageListTable = () => {
	const pageQuery = useQuery(orpc.tlgPageRouter.list.queryOptions());
	return (
		<Card className="w-full">
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead className="w-full">Title</TableHead>
							<TableHead>操作</TableHead>
							<TableHead>删除</TableHead>
							<TableHead>预览</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{pageQuery.data?.map((item) => (
							<TableRow key={item.id}>
								<TableCell>{item.id}</TableCell>
								<TableCell>{item.title || "无标题"}</TableCell>
								<TableCell>
									<TlgPageEditButton pageId={item.id} />
								</TableCell>
								<TableCell>
									<TlgPageRemoveButton pageId={item.id} />
								</TableCell>

								<TableCell>
									<Link
										to="/tlg/page/$id"
										params={{ id: item.id.toString() }}
										target="_blank"
									>
										<Button variant={"ghost"}>
											<EyeIcon />
											预览
										</Button>
									</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};
