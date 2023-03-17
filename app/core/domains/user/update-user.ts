import { db } from "app/core/lib/db";

import type { Password, Prisma, User } from "@prisma/client";

export async function updateUserPassword(
	email: User['email'],
	hashedPassword: Password['hash'],
	include?: Prisma.UserInclude
) {
	if (typeof email !== 'string') throw new Error('Invalid email.');

	return db.user.update({
		where: {email},
		data: {
			password: {
				update: {
					hash: hashedPassword
				}
			}
		},
		include: {
			password: include?.password || false,
			subscription: include?.subscription || false,

			...include
		}
	});
}
