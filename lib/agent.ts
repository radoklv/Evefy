import {
  AnalystOutputSchema,
  ArchitectOutputSchema,
  HumanResourceOutputSchema,
  SalesOutputSchema,
  ValidatorOutputSchema,
} from "@/types/agents";
import { Agent } from "@openai/agents";
import { AnyZodObject, z } from "zod";

export function createAgent(
  name: string,
  instructions: string,
  schema: z.AnyZodObject
) {
  return new Agent({
    name: name,
    model: "o4-mini",
    instructions: instructions,
    outputType: schema,
  });
}

export function initAgents(): Agent<unknown, AnyZodObject>[] {
  const validatorAgent = createAgent(
    "Requirements Validator",
    "Extract project goals, context, and key requirements from the input text.",
    ValidatorOutputSchema
  );

  const architectAgent = createAgent(
    "Solution Architect",
    "Design architecture and define required technical roles based on validated requirements.",
    ArchitectOutputSchema
  );

  const analystAgent = createAgent(
    "Project Analyst",
    "You will analyze the technical information from Solution architect.",
    AnalystOutputSchema
  );

  const hrAgent = createAgent(
    "Human Resource",
    "Calculate workforce cost using estimated FTEs and standard EU blended rates.",
    HumanResourceOutputSchema
  );

  const salesAgent = createAgent(
    "Sales man",
    "Generate a professional, client-facing proposal letter summarizing the project and cost breakdown in business language, formatted like an official offer document",
    SalesOutputSchema
  );

  return [validatorAgent, architectAgent, analystAgent, hrAgent, salesAgent];
}
