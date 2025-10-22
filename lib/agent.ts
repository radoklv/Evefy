import { Agent } from "@openai/agents";

export function createAgent(name: string, instructions: string) {
  return new Agent({
    name: name,
    model: "o4-mini",
    instructions: instructions
  });
}
