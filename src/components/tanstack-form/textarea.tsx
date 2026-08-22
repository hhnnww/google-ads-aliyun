import type { ComponentProps } from "react";
import { Field, FieldContent, FieldLabel } from "#/components/ui/field.tsx";
import { Textarea } from "#/components/ui/textarea.tsx";
import { useFieldContext } from "#/hooks/form-context.tsx";

export const TanstackTextarea = (props: ComponentProps<"textarea">) => {
	const field = useFieldContext<string | number>();

	return (
		<Field>
			<FieldLabel>{field.name}</FieldLabel>
			<FieldContent>
				<Textarea
					value={field.state.value}
					onChange={(e) => field.handleChange(e.target.value)}
					className="resize-none min-h-24 max-h-48"
					{...props}
				/>
			</FieldContent>
		</Field>
	);
};
