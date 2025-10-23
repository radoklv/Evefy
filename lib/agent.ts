import { Agent } from "@openai/agents";
import {z} from 'zod'

export function createAgent(name: string, instructions: string, schema: z.AnyZodObject) {
  return new Agent({
    name: name,
    model: "o4-mini",
    instructions: instructions,
    outputType: schema
  });
}
