"use server";
import { createAgent } from "@/lib/agent";
import {
  ArchitectOutputSchema,
  HumanResourceOutputSchema,
  ProjectAnalystOutputSchema,
  SalesOutputSchema,
  ValidatorOutputSchema,
} from "@/types/agents";
import { run } from "@openai/agents";

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
    "You will analyze the technical information from Solution architect, and you will generate 'workforceEstimate' based on this information. You can improvise.",
    ProjectAnalystOutputSchema
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

  const validatorAgentOutput = await run(validatorAgent, inputText);

  const validationAgentParsedOutput = JSON.stringify(
    ValidatorOutputSchema.safeParse(validatorAgentOutput.finalOutput).data
  );

  const architectAgentOutput = await run(
    architectAgent,
    validationAgentParsedOutput
  );

  // const architectAgentParsedOutput = JSON.stringify(
  //   ArchitectOutputSchema.safeParse(architectAgentOutput.finalOutput).data
  // );

  // const analystAgentOutput = await run(
  //   analystAgent,
  //   architectAgentParsedOutput
  // );

  // const analystAgentParsedOutput = JSON.stringify(
  //   ProjectAnalystOutputSchema.safeParse(analystAgentOutput.finalOutput).data
  // );

  // const hrAgentOutput = await run(hrAgent, analystAgentParsedOutput);

  // const hrAgentParsedOutput = JSON.stringify(
  //   HumanResourceOutputSchema.safeParse(hrAgentOutput.finalOutput).data
  // );

  // const salesAgentOutput = await run(salesAgent, hrAgentParsedOutput);

  return "dasdas";
}
