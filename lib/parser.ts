import { Agent, run } from "@openai/agents";
import { AnyZodObject, z } from "zod";

export async function parseAgentOutput(
  agent: Agent<unknown, AnyZodObject>,
  agentSchema: z.AnyZodObject,
  instructions: string
): Promise<string> {
  const agentOutput = await run(agent, instructions);

  return JSON.stringify(agentSchema.safeParse(agentOutput.finalOutput).data);
}
