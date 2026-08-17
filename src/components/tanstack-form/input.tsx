import type { ComponentProps } from "react";
import { Field, FieldContent, FieldLabel } from "#/components/ui/field.tsx";
import { Input } from "#/components/ui/input.tsx";
import { useFieldContext } from "#/hooks/form-context.tsx";

export const TanstackInput = (props: ComponentProps<"input">) => {
	const field = useFieldContext<string | number>();

	return (
		<Field>
			<FieldLabel>{field.name}</FieldLabel>
			<FieldContent>
				<Input
					value={field.state.value}
					onChange={(e) =>
						field.handleChange(
							props.type === "number" ? Number(e.target.value) : e.target.value,
						)
					}
					{...props}
				/>
			</FieldContent>
		</Field>
	);
};
