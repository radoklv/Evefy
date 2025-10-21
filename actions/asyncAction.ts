"use server";
import { createAgent } from "@/lib/agents";
import { run } from "@openai/agents";

export type FormState = {
  message: string;
};

const agent = createAgent(
  "Helper",
  "You are a concise and friendly assistant."
);

export async function submitPrompt(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const prompt = formData.get("prompt") as string;

  const agentResponse = await run(agent, prompt);

  return { message: agentResponse.finalOutput?.description || "No response" };
}


