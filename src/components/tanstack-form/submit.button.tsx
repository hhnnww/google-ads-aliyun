import { Button } from "#/components/ui/button.tsx";
import { useFormContext } from "#/hooks/form-context.tsx";

export const TanstackSubmitButton = () => {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button
					type="submit"
					onClick={async () => await form.handleSubmit()}
					disabled={isSubmitting}
				>
					提交
				</Button>
			)}
		</form.Subscribe>
	);
};
