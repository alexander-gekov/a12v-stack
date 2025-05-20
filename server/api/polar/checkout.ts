import { Polar } from "@polar-sh/sdk";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const polar = new Polar({
    accessToken: config.polarAccessToken,
    server: config.polarServer as "sandbox" | "production",
  });

  try {
    const checkout = await polar.checkouts.create({
      products: [body.productId],
      successUrl: config.polarCheckoutSuccessUrl,
    });

    return checkout;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      message: "Failed to create checkout session",
    });
  }
});
