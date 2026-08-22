import { useState } from "react";
import { Button } from "#/components/ui/button.tsx";

export const TlgPageLike = (props: { like: number }) => {
	const [like, setLike] = useState(props.like);
	return (
		<div className="">
			<Button
				variant={"ghost"}
				onClick={() => {
					setLike(like + 1);
				}}
			>
				<LikeSvg />
				{like}
			</Button>
		</div>
	);
};

const LikeSvg = () => {
	return (
		<svg viewBox="0 0 24 24" width="20px" height="20px" aria-hidden="true">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="m14.539 4.661-.004.04-.003.04-.006.072a1 1 0 0 1-.016.116l-1.03 5.017h6.765a.267.267 0 0 1 .264.301l-1.311 8.533v.002a.27.27 0 0 1-.267.227H7.708v-7.9l5.224-5.017 1.027-.963c.066-.054.134-.117.18-.161l.022-.02c.07-.066.132-.122.195-.172a.7.7 0 0 1 .183-.115m.692-1.49c.246.097.41.239.51.334.22.206.31.465.349.618.044.172.058.342.058.478v.038l-.003.038a9 9 0 0 0-.024.28 3 3 0 0 1-.043.293l-.635 3.095h4.802a1.867 1.867 0 0 1 1.849 2.13l-.002.009-1.312 8.538a1.87 1.87 0 0 1-1.862 1.588H6.108V10.427l5.725-5.5 1.081-1.012.03-.023.032-.029c.02-.017.038-.035.063-.058l.03-.028c.073-.068.175-.163.292-.256.218-.172.59-.425 1.068-.458.29-.02.557.01.802.108M2.688 10.013a.8.8 0 0 1 .8.8v10.13h-1.6v-10.13a.8.8 0 0 1 .8-.8"
			></path>
		</svg>
	);
};
