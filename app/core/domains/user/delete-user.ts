import { db } from "app/core/lib/db";

import type { Prisma, User } from "@prisma/client";

export async function deleteUser(id: User['id'], include?: Prisma.UserInclude) {
	return db.user.delete({
		where: {id},
		include: {
			password: include?.password || false,
			subscription: include?.subscription || false,

			...include
		}
	});
}
