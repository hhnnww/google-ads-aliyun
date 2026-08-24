import { os } from "@orpc/server";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { z } from "zod";
import { auth } from "#/lib/auth.ts";

const signIn = os
	.input(
		z.object({
			username: z.string(),
			password: z.string(),
		}),
	)
	.handler(async (ctx) => {
		const headers = getRequestHeaders();
		return await auth.api.signInUsername({
			body: {
				username: ctx.input.username,
				password: ctx.input.password,
			},
			headers,
		});
	});

const signOut = os.handler(async () => {
	const headers = getRequestHeaders();
	return await auth.api.signOut({ headers });
});

export const authRoute = {
	signIn,
	signOut,
};
