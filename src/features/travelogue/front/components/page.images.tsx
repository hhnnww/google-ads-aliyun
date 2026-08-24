import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from "#/components/ui/dialog.tsx";
import type { ImageSelect } from "#/features/image/schema.ts";

export const TlgPageImages = (props: { images: ImageSelect[] }) => {
	return (
		<div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
			{props.images.map((item) => (
				<div key={item.id} className="">
					<ImageSingle image={item} />
				</div>
			))}
		</div>
	);
};

const ImageSingle = (props: { image: ImageSelect }) => {
	return (
		<Dialog>
			<DialogTrigger className="focus-visible:outline-none aspect-square w-full overflow-hidden">
				<img
					src={props.image.smUrl}
					alt={props.image.alt}
					className="w-full h-full object-cover object-center rounded-sm"
					loading="lazy"
				/>
			</DialogTrigger>

			<DialogContent className="lg:max-w-xl p-0 ring-0 rounded-md bg-transparent">
				<img
					src={props.image.mdUrl}
					alt={props.image.alt}
					className="w-full h-full object-contain rounded-sm"
				/>
			</DialogContent>
		</Dialog>
	);
};
