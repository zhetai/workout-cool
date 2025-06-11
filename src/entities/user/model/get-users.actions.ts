"use server";

import { z } from "zod";
import { Prisma, UserRole } from "@prisma/client";

import { prisma } from "@/shared/lib/prisma";
import { authenticatedActionClient } from "@/shared/api/safe-actions";

const getUsersSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
  search: z.string().optional(),
  sortBy: z.enum(["createdAt", "email", "elementCount"]).optional().default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

export const getUsersAction = authenticatedActionClient.schema(getUsersSchema).action(async ({ parsedInput, ctx }) => {
  const { user: authUser } = ctx;

  if (!authUser || authUser.role !== UserRole.admin) {
    throw new Error("Unauthorized");
  }

  const { page, limit, search, sortBy, sortOrder } = parsedInput;

  const where: Prisma.UserWhereInput = search
    ? {
        OR: [
          { id: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { email: { contains: search, mode: Prisma.QueryMode.insensitive } },
        ],
      }
    : {};

  const selectClause = {
    id: true,
    email: true,
    emailVerified: true,
    firstName: true,
    lastName: true,
    createdAt: true,
    role: true,
    pages: {
      select: {
        id: true,
        slug: true,
        _count: {
          select: { elements: true },
        },
      },
    },
  };

  let fetchedUsers: Array<
    Omit<Prisma.UserGetPayload<{ select: typeof selectClause }>, "pages"> & {
      pages: Array<{ id: string; slug: string; _count: { elements: number } }>;
    }
  >;
  const totalCount = await prisma.user.count({ where });

  if (sortBy === "elementCount") {
    fetchedUsers = await prisma.user.findMany({
      select: selectClause,
      where,
    });

    const usersWithData = fetchedUsers.map((u) => ({
      ...u,
      elementCount: u.pages.reduce((acc, p) => acc + (p._count?.elements || 0), 0),
    }));

    usersWithData.sort((a, b) => {
      const diff = a.elementCount - b.elementCount;
      return sortOrder === "asc" ? diff : -diff;
    });

    const skip = (page - 1) * limit;
    fetchedUsers = usersWithData.slice(skip, skip + limit);
  } else {
    const skip = (page - 1) * limit;
    let orderByPrisma: Prisma.UserOrderByWithRelationInput = {};
    if (sortBy === "createdAt") {
      orderByPrisma = { createdAt: sortOrder };
    } else if (sortBy === "email") {
      orderByPrisma = { email: sortOrder };
    }

    fetchedUsers = await prisma.user.findMany({
      select: selectClause,
      where,
      orderBy: orderByPrisma,
      skip,
      take: limit,
    });
  }

  const usersToReturn = fetchedUsers.map((u) => {
    const elementCount = (u as any).elementCount ?? u.pages.reduce((acc, p) => acc + (p._count?.elements || 0), 0);
    return {
      ...u,
      elementCount,
    };
  });

  return {
    users: usersToReturn,
    pagination: {
      total: totalCount,
      pages: Math.ceil(totalCount / limit),
      page,
      limit,
    },
  };
});
