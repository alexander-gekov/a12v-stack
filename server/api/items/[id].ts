import { prisma } from "../../../lib/prisma";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const method = getMethod(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Missing id parameter",
    });
  }

  switch (method) {
    case "PATCH": {
      const body = await readBody(event);
      return await prisma.items.update({
        where: { id },
        data: {
          name: body.name,
          description: body.description,
          status: body.status,
        },
      });
    }
    case "DELETE": {
      return await prisma.items.delete({
        where: { id },
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
