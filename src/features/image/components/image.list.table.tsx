import { Card, CardContent } from "#/components/ui/card.tsx";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table.tsx";
import { ImageRemoveButton } from "#/features/image/components/image.remove.button.tsx";
import type { ImageRouter } from "#/features/image/orpc.ts";

export const ImageListTable = (props: { images: ImageRouter["list"] }) => {
	return (
		<Card className="w-full">
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>图片预览</TableHead>
							<TableHead>创建时间</TableHead>
							<TableHead>图片大小</TableHead>
							<TableHead>删除</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{props.images.map((image) => (
							<TableRow key={image.id}>
								<TableCell>{image.id}</TableCell>
								<TableCell>
									<div className="aspect-square w-12 h-12">
										<img
											src={image.url}
											alt={image.alt}
											className="w-full h-full object-cover"
										/>
									</div>
								</TableCell>
								<TableCell>{image.createdAt.toISOString()}</TableCell>
								<TableCell>{image.sizeStr}</TableCell>

								<TableCell>
									<ImageRemoveButton imageId={image.id} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};
