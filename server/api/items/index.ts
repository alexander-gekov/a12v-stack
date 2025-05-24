import { prisma } from "../../../lib/prisma";

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  switch (method) {
    case "GET": {
      const query = getQuery(event);
      const {
        name,
        status,
        sortBy = "createdAt",
        sortOrder = "desc",
        page = "1",
        pageSize = "10",
      } = query;

      const filters: any = {};

      if (name) {
        filters.name = {
          contains: name,
          mode: "insensitive",
        };
      }

      if (status) {
        filters.status = Array.isArray(status)
          ? { in: status }
          : { equals: status };
      }

      const [total, items] = await Promise.all([
        prisma.items.count({ where: filters }),
        prisma.items.findMany({
          where: filters,
          orderBy: { [sortBy as string]: sortOrder },
          skip: (Number(page) - 1) * Number(pageSize),
          take: Number(pageSize),
        }),
      ]);

      return {
        items,
        pageCount: Math.ceil(total / Number(pageSize)),
        total,
      };
    }
    case "POST": {
      const body = await readBody(event);
      return await prisma.items.create({
        data: body,
      });
    }
    default: {
      throw createError({
        statusCode: 405,
        message: "Method not allowed",
      });
    }
  }
});
