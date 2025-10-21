import { Agent, AgentOutputType } from "@openai/agents";

import { z } from "zod";

const MyAgentSchema = z.object({ name: z.string(), description: z.string() });

export function createAgent(name: string, instructions: string) {
  console.log(`AGENT ${name} CREATED`);
  return new Agent({
    name: name,
    model: "o4-mini",
    instructions: instructions,
    outputType: MyAgentSchema,
  });
}
