import {
  AnalystOutputSchema,
  ArchitectOutputSchema,
  HumanResourceOutputSchema,
  SalesOutputSchema,
  ValidatorOutputSchema,
} from "@/types/agents-schemas";
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
    instructions: `${instructions} Only return JSON based on this schema: ${schema.shape}`,
    outputType: schema,
  });
}

export function initAgents(): Agent<unknown, AnyZodObject>[] {
  const validatorAgent = createAgent(
    "Requirements Validator",
    "You are the Requirements Validator. Your job is to Read session inputs and files - deduplicate, note risks, open questions. Extract only project-relevant info. If deadline missing, infer a realistic date. Also include rationale + confidence. List assumptions and open questions. Use only session info; tag any inference as an assumption.",
    ValidatorOutputSchema
  );

  const architectAgent = createAgent(
    "Solution Architect",
    "You are the Solution Architect role. Propose high-level architecture aligned to epics. Include markdown overview, components, integration points, NFRs, risks. Keep it implementation-ready but concise.",
    ArchitectOutputSchema
  );

  const analystAgent = createAgent(
    "Project Analyst",
    "You are the Project Analyst. Decompose validated requirements into Epics withh acceptance criteria. Estimate effort per task in ideal days and compute a critical path. Propose workforce requirements (role, seniority)",
    AnalystOutputSchema
  );

  const hrAgent = createAgent(
    "Human Resource",
    "You are HR responsible for create ricing. Given workforce requirements, and calculate total cost.",
    HumanResourceOutputSchema
  );

  const salesAgent = createAgent(
    "Sales man",
    "You are Sales. Compose client-facing proposal based on inputs (reqs report, epics, costs, architecture (write your own inputs in case they are different)). Include title, summary, scope, timeline (respect deadline), price breakdown and total, assumptions, terms, next steps. Keep it concise and persuasive.",
    SalesOutputSchema
  );

  return [validatorAgent, architectAgent, analystAgent, hrAgent, salesAgent];
}
