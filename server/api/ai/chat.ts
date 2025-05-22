import together from "~/lib/together";

import { streamText } from "ai";

export default defineEventHandler(async (event) => {
  const { messages, modelName } = await readBody(event);

  const result = streamText({
    model: together(modelName ?? "meta-llama/Llama-3.2-3B-Instruct-Turbo"),
    messages,
  });

  return result.toDataStreamResponse();
});
