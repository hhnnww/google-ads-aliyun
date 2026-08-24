import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card.tsx";
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
				<CardHeader>
					<CardTitle>Sign In</CardTitle>
					<CardDescription>Sign In to your account</CardDescription>
				</CardHeader>
				<form.AppForm>
					<CardContent className="p-6">
						<form>
							<div className="flex flex-col gap-6 items-start">
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
							</div>
						</form>
					</CardContent>

					<CardFooter>
						<form.submitButton />
					</CardFooter>
				</form.AppForm>
			</Card>
		</div>
	);
};
