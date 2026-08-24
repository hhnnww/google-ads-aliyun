import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Card, CardContent } from "#/components/ui/card.tsx";
import { useAppForm } from "#/hooks/form.tsx";
import { orpc } from "#/orpc/client.ts";

export const SignIn = () => {
	const navigate = useNavigate();
	const signMutation = useMutation(
		orpc.authRoute.signIn.mutationOptions({
			onSuccess: () => {
				return navigate({ to: "/admin" });
			},
		}),
	);

	const form = useAppForm({
		defaultValues: {
			username: "",
			password: "",
		},

		onSubmit: async (ctx) => {
			return await signMutation.mutateAsync(ctx.value);
		},
	});

	return (
		<div className="h-screen w-screen flex items-center justify-center">
			<Card className="w-100">
				<CardContent>
					<form.AppForm>
						<form>
							<div className="flex flex-col gap-4">
								<form.AppField name="username">
									{(field) => <field.input autoComplete="username" />}
								</form.AppField>

								<form.AppField name="password">
									{(field) => (
										<field.input
											type="password"
											autoComplete="current-password"
										/>
									)}
								</form.AppField>

								<form.submitButton />
							</div>
						</form>
					</form.AppForm>
				</CardContent>
			</Card>
		</div>
	);
};
