import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button.tsx";
import { ButtonGroup } from "#/components/ui/button-group.tsx";

export const ImagePageNavi = (props: { currentPage: number }) => {
	return (
		<ButtonGroup>
			<Button
				nativeButton={false}
				disabled={props.currentPage === 1}
				variant={props.currentPage === 1 ? "ghost" : "default"}
				render={(buttonProps) => (
					<Link
						to="/admin/image/list/$pagenum"
						params={{ pagenum: (props.currentPage - 1).toString() }}
						{...buttonProps}
					>
						上一页
					</Link>
				)}
			/>

			<Link
				to="/admin/image/list/$pagenum"
				params={{ pagenum: (props.currentPage + 1).toString() }}
			>
				<Button>下一页</Button>
			</Link>
		</ButtonGroup>
	);
};
