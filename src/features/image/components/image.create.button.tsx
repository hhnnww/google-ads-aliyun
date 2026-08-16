import { useState } from "react";
import { Button } from "#/components/ui/button.tsx";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "#/components/ui/dialog.tsx";
import { ImageCreateForm } from "#/features/image/components/image.create.form.tsx";

export const ImageCreateButton = (props: { onSuccess: () => void }) => {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger render={(props) => <Button {...props}>创建图片</Button>} />

			<DialogContent>
				<DialogHeader>
					<DialogTitle>上传图片</DialogTitle>
					<DialogDescription>也可以直接粘贴图片到这里上传</DialogDescription>
				</DialogHeader>
				<ImageCreateForm
					onSuccess={props.onSuccess}
					onClose={() => setOpen(false)}
				/>
			</DialogContent>
		</Dialog>
	);
};
