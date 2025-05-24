import { prisma } from "../../../lib/prisma";

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  switch (method) {
    case "GET": {
      return await prisma.items.findMany({
        orderBy: { createdAt: "desc" },
      });
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
