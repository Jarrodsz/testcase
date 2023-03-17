import { db } from "app/core/lib/db";
import { z } from "zod";

import type { Prisma, User } from "@prisma/client";

import { makeDomainFunction } from "domain-functions";

/**
 * X
 */

export const getUsers = makeDomainFunction(z.any())(async () => ({
	users: await db.user.findMany({orderBy: {createdAt: 'desc'}})
}));

export const getUser = makeDomainFunction(z.object({id: z.string()}))(
	async ({id}) => ({
		user: await db.user.findFirstOrThrow({where: {id}})
	})
);

/**
 * LOGIC
 */

export async function getUserById(userId: string) {
	const user = await db.user.findUnique({
		where: {id: userId},
		include: {
			subscription: true,
			UserProfile: true,
			organisation: {
				include: {
					OrganisationProfile: true
				}
			}
		}
	});

	return user;
}

interface GetUserByEmailParams {
	email: User['email'];
	include?: Prisma.UserInclude;
}

export async function getUserByEmail({email, include}: GetUserByEmailParams) {
	if (typeof email !== 'string') throw new Error('email must be a string.');

	return db.user.findUnique({
		where: {email},
		include: {
			organisation: include?.organisation || false,
			subscription: include?.subscription || false,
			password: include?.password || false,
			UserProfile: include?.UserProfile || false,

			...include
		}
	});
}
