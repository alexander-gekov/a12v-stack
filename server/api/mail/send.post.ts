import resend from "~/lib/resend";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);

  await resend.emails.send({
    from: config.resendFrom ?? "hello@a12v.dev",
    to: body.to,
    subject: body.subject,
    html: body.html,
  });
});
