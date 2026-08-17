import { createFormHook } from "@tanstack/react-form";
import { TanstackInput } from "#/components/tanstack-form/input.tsx";
import { TanstackSubmitButton } from "#/components/tanstack-form/submit.button.tsx";
import { TanstackTextarea } from "#/components/tanstack-form/textarea.tsx";
import { fieldContext, formContext } from "./form-context";

export const { useAppForm } = createFormHook({
	fieldComponents: {
		input: TanstackInput,
		textarea: TanstackTextarea,
	},
	formComponents: {
		submitButton: TanstackSubmitButton,
	},
	fieldContext,
	formContext,
});
