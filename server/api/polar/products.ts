import { Polar } from "@polar-sh/sdk";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  const polar = new Polar({
    accessToken: config.polarAccessToken,
    server: config.polarServer as "sandbox" | "production",
  });

  try {
    const products = await polar.products.list({});
    return products;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch Polar products",
    });
  }
});
