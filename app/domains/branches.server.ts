import {z} from 'zod';

import {db} from '~/core/lib/db';

import {makeDomainFunction} from 'domain-functions';

export const newBranchSchema = z.object({
	name: z.string().min(1).max(40)
});

export const updateBranchSchema = z.object({
	branchId: z.string().min(1),
	name: z.string().min(1).max(40)
});

export const createBranch = makeDomainFunction(newBranchSchema)((fields) =>
	db.branch.create({data: {...fields}})
);

export const deleteBranch = makeDomainFunction(z.object({id: z.string()}))(
	async ({id}) => {
		const branch = await db.branch.findFirstOrThrow({where: {id}});
		return db.branch.delete({where: {id}});
	}
);

export const getBranches = makeDomainFunction(z.any())(async () => ({
	branches: await db.branch.findMany({
		select: {
			id: true,
			branchId: true,
			name: true
		},
		orderBy: {createdAt: 'asc'}
	})
}));

export const getBranch = makeDomainFunction(z.object({id: z.string()}))(
	async ({id}) => ({
		branch: await db.branch.findFirstOrThrow({where: {id}})
	})
);

export const updateBranch = makeDomainFunction(updateBranchSchema)(
	async ({branchId, name}) => {
		const branch = await db.branch.update({
			where: {
				id: branchId
			},
			data: {
				name: name
			}
		});
		if (!branch) throw new Error('Branch not updated.');
		return {branch};
	}
);
