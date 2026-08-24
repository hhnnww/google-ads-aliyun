import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "#/db/index.ts";

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	database: drizzleAdapter(db, {
		provider: "sqlite",
	}),
	plugins: [tanstackStartCookies(), username()],
	trustedOrigins: ["http://localhost:3000", "https://inxizang.com/"],
	secret: "36155fbcc9511a7ccb33a28f7d19d694a640845dcb5723d6a84278819e73c319",
});
