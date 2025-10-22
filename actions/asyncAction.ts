"use server";
import { createAgent } from "@/lib/agent";
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
    "You read project requirements and generate only and relevant information about the project"
  );

  const solutionArchitectAgent = createAgent(
    "Solution Architect",
    "You analyze data from Requirements Validator and create 'Architectural Documentation' about the project. Also generate what software developers will be required for the project."
  );

  const projectAnalystAgent = createAgent(
    "Project Analyst",
    "You receive information from 'Solution Architect' and generate cost for workforce"
  );

  const humanResourceAgent = createAgent(
    "Human Resource",
    "You will receive information from 'Project Analyst' and will generate project workforce cost"
  );

  const salesAgent = createAgent(
    "Sales man",
    "You will generate formatted offer to the end client."
  );

  const validationStep = await run(validatorAgent, inputText);

  // Step 2: Analyze
  const solutionArchitectStep = await run(
    solutionArchitectAgent,
    validationStep.finalOutput || ""
  );

  const projectAnalystStep = await run(
    projectAnalystAgent,
    solutionArchitectStep.finalOutput || ""
  );

  const humanResourceStep = await run(
    humanResourceAgent,
    projectAnalystStep.finalOutput || ""
  );

  const salesStep = await run(salesAgent, humanResourceStep.finalOutput || "");

  return salesStep.finalOutput || "";
}
