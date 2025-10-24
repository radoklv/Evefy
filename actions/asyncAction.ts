"use server";
import { initAgents } from "@/lib/agent";

import {
  AnalystOutputSchema,
  ArchitectOutputSchema,
  HumanResourceOutputSchema,
  SalesOutputSchema,
  ValidatorOutput,
  ValidatorOutputSchema,
} from "@/types/agents";
import { agentops } from "agentops";

import { runAgent } from "@/lib/run-agent";

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
  await agentops.init({
    apiKey: "cf1c25f8-abc2-4238-8ff2-380ab5165041",
  });

  const [validatorAgent, architectAgent, analystAgent, hrAgent, salesAgent] =
    initAgents();

  const validatorAgentOutput = await runAgent(
    validatorAgent,
    ValidatorOutputSchema,
    inputText
  );

  const { keyRequirements, endDate, summary }: ValidatorOutput =
    JSON.parse(validatorAgentOutput);

  if (keyRequirements.length == 0 || endDate == "" || summary == "") {
    return JSON.stringify({
      error: "Missing essential initial information about the project",
    });
  }

  const architectAgentOutput = await runAgent(
    architectAgent,
    ArchitectOutputSchema,
    validatorAgentOutput
  );

  const analystAgentOutput = await runAgent(
    analystAgent,
    AnalystOutputSchema,
    architectAgentOutput
  );

  const hrAgentOutput = await runAgent(
    hrAgent,
    HumanResourceOutputSchema,
    analystAgentOutput
  );

  const salesAgentOutput = await runAgent(
    salesAgent,
    SalesOutputSchema,
    hrAgentOutput
  );

  return salesAgentOutput;
}
