import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Button } from "#/components/ui/button.tsx";
import { Spinner } from "#/components/ui/spinner.tsx";
import { imageApi } from "#/features/image/api.ts";
import type { ImageSelect } from "#/features/image/schema.ts";

export const ImageCreateForm = (props: {
	onSuccess: (data: ImageSelect[]) => void;
	onClose?: () => void;
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const updateImageMutation = useMutation(
		imageApi.create.mutationOptions({
			onSuccess: (ctx) => {
				props.onClose?.();
				props.onSuccess(ctx);
			},
		}),
	);

	useEffect(() => {
		const handlePaste = (e: ClipboardEvent) => {
			const files: File[] = [];
			const items = e.clipboardData?.items;
			if (!items) return;
			for (let i = 0; i < items.length; i++) {
				const item = items[i];
				if (item.type.startsWith("image/")) {
					const file = item.getAsFile();
					if (file) files.push(file);
				}
			}
			if (files.length > 0) {
				updateImageMutation.mutate({ files });
			}
		};
		window.addEventListener("paste", handlePaste);
		return () => window.removeEventListener("paste", handlePaste);
	}, [updateImageMutation]);

	return (
		<div className="">
			<Button
				variant={"ghost"}
				onClick={() => inputRef.current?.click()}
				className="w-full py-20 border-2 border-zinc-400 border-dashed"
			>
				{updateImageMutation.isPending ? <Spinner /> : "上传图片"}
			</Button>
			<input
				type="file"
				multiple
				accept="image/*"
				ref={inputRef}
				hidden
				onChange={async (e) => {
					if (!e.target.files) {
						return;
					}
					await updateImageMutation.mutateAsync({
						files: Array.from(e.target.files),
					});
				}}
			/>
		</div>
	);
};
