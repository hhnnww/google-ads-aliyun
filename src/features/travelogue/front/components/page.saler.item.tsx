import { CheckIcon, CopyIcon, SquareArrowOutUpRightIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button.tsx";
import { Input } from "#/components/ui/input.tsx";

export const TlgPageSalerItem = (props: {
	title: string;
	content: string;
	buttonLabel: string;
	link: string;
}) => {
	const [copyStatus, setCopyStatus] = useState(false);

	return (
		<div className="flex flex-col gap-2">
			<div className="font-bold">{props.title}</div>
			<div className="flex flex-row gap-2">
				<Input value={props.content} />
				<Button
					onClick={() => {
						setCopyStatus(true);
						navigator.clipboard.writeText(props.content);
						setTimeout(() => {
							setCopyStatus(false);
						}, 2000);
					}}
					variant={"outline"}
				>
					{copyStatus ? <CheckIcon /> : <CopyIcon />}
					{copyStatus ? "複製成功" : "複製"}
				</Button>
			</div>

			<div className="">
				<a href={props.link} target="_blank" rel="noopener noreferrer">
					<Button className={"w-full"}>
						<SquareArrowOutUpRightIcon />
						{props.buttonLabel}
					</Button>
				</a>
			</div>
		</div>
	);
};
