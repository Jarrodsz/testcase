import { db } from "app/core/lib/db";

import type { Prisma, User, UserPassword } from "@prisma/client";

export async function createEmailUser(
	user: Pick<User, 'email'>,
	hashedPassword: UserPassword['hash'],
	include?: Prisma.UserInclude
) {
	return db.user.create({
		data: {
			...user,
			password: {
				create: {
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

export async function createSocialUser(
	user: Pick<User, 'id' | 'email'>,
	include?: Prisma.UserInclude
) {
	return db.user.create({
		data: {
			...user
		},
		include: {
			password: include?.password || false,
			subscription: include?.subscription || false,

			...include
		}
	});
}
