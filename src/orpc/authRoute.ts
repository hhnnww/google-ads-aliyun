import { os } from "@orpc/server";
import { ensureSession } from "#/features/auth/server.ts";

const authMiddleware = os.middleware(async ({ next }) => {
	const session = await ensureSession();

	return next({
		context: {
			user: session.user,
		},
	});
});

export const authAdminRoute = os.use(authMiddleware);
