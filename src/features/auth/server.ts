import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";

export const getSession = createServerFn({ method: "GET" }).handler(
	async () => {
		const headers = getRequestHeaders();
		const session = await auth.api.getSession({ headers });

		return session;
	},
);

export const ensureSession = createServerFn({ method: "GET" }).handler(
	async () => {
		const headers = getRequestHeaders();
		const session = await auth.api.getSession({ headers });

		if (!session) {
			throw new Error("Unauthorized");
		}

		return session;
	},
);

export const createAdminUser = createServerFn({ method: "POST" }).handler(
	async () => {
		const username = "admintibet";
		const password = "12qwaszx";

		const active = await auth.api.isUsernameAvailable({
			body: {
				username,
			},
		});

		if (active.available) {
			await auth.api.signUpEmail({
				body: {
					email: "admintibet@example.com",
					name: username,
					password,
					username,
				},
			});
		}
	},
);
