import { Card, CardContent } from "#/components/ui/card.tsx";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table.tsx";
import { TraveloguePageEditButton } from "#/features/travelogue/page/components/travelogue.page.edit.button.tsx";
import { TraveloguePageRemoveButton } from "#/features/travelogue/page/components/travelogue.page.remove.button.tsx";
import type { TraveloguePageRouter } from "#/features/travelogue/page/orpc.ts";

export const TraveloguePageListTable = (props: {
	pages: TraveloguePageRouter["list"];
}) => {
	return (
		<Card className="w-full">
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead className="w-full">标题</TableHead>

							<TableHead>编辑</TableHead>
							<TableHead>操作</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{props.pages.map((page) => (
							<TableRow key={page.id}>
								<TableCell>{page.id}</TableCell>
								<TableCell>{page.title}</TableCell>
								<TableCell>
									<TraveloguePageEditButton traveloguePageId={page.id} />
								</TableCell>
								<TableCell>
									<TraveloguePageRemoveButton traveloguePageId={page.id} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};
