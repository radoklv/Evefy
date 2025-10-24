"use server";
import { createAgent } from "@/lib/agent";

import {
  AnalystOutputSchema,
  ArchitectOutputSchema,
  HumanResourceOutputSchema,
  SalesOutputSchema,
  ValidatorOutputSchema,
} from "@/types/agents";
import { agentops } from "agentops";

import { parseAgentOutput } from "@/lib/parser";

export type FormState = {
  message: string;
};

export async function submitPrompt(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const prompt = formData.get("prompt") as string;

  const response = await runAgentsPipeline(prompt);

  return { message: response || "No response" };
}

export async function runAgentsPipeline(inputText: string): Promise<string> {
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


  const validatorAgentOutput = await parseAgentOutput(
    validatorAgent,
    ValidatorOutputSchema,
    inputText
  );

  const architectAgentOutput = await parseAgentOutput(
    architectAgent,
    ArchitectOutputSchema,
    validatorAgentOutput
  );


  const analystAgentOutput = await parseAgentOutput(
    analystAgent,
    AnalystOutputSchema,
    architectAgentOutput
  );

  const hrAgentOutput = await parseAgentOutput(
    hrAgent,
    HumanResourceOutputSchema,
    analystAgentOutput
  );

  const salesAgentOutput = await parseAgentOutput(
    salesAgent,
    SalesOutputSchema,
    hrAgentOutput
  );

  return salesAgentOutput;
}
