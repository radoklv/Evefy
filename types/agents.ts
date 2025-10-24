import { z } from "zod";

export const ValidatorOutputSchema = z
  .object({
    projectName: z.string(),
    summary: z.string(),
    endDate: z.string(),
    keyRequirements: z.array(z.string()),
  })
  .strict();

export const ArchitectOutputSchema = z
  .object({
    architectureOverview: z.string(),
    mainComponents: z.array(z.string()),
    requiredRoles: z.array(z.string()),
  })
  .strict();

export const AnalystOutputSchema = z
  .object({
    workforceEstimate: z.array(
      z.object({
        role: z.string(),
        fte: z.number(),
      })
    ),
    totalDurationMonths: z.number().int().positive(),
    risks: z.array(z.string()),
    assumptions: z.array(z.string()),
  })
  .strict();

export const HumanResourceOutputSchema = z
  .object({
    roles: z.array(
      z
        .object({
          role: z.string(),
          fte: z.number().nonnegative(),
          responsibilities: z.array(z.string()),
        })
        .strict()
    ),
    hiringPlan: z.array(z.string()),
    trainingPlan: z.array(z.string()),
  })
  .strict();

export const SalesOutputSchema = z
  .object({
    date: z.string(),
    to: z.string(),
    from: z.string(),
    subject: z.string(),
    executiveSummary: z.string(),
    assumptions: z.array(z.string()),
    workforceBreakdown: z.array(
      z
        .object({
          role: z.string(),
          fte: z.number(),
          unit: z.string(),
        })
        .strict()
    ),
    subtotal: z.string(),
    contingency: z.string(),
    totalCost: z.string(),
    optionsAndNextSteps: z.array(z.string()),
    closing: z.string(),
    contact: z
      .object({
        name: z.string(),
        title: z.string(),
        email: z.string(),
        phone: z.string(),
      })
      .strict(),
  })
  .strict();

export type ValidatorOutput = z.infer<typeof ValidatorOutputSchema>;
export type SolutionArchitectOutput = z.infer<typeof ArchitectOutputSchema>;
export type ProjectAnalystOutput = z.infer<typeof AnalystOutputSchema>;
export type HumanResourceOutput = z.infer<typeof HumanResourceOutputSchema>;
export type SalesOutput = z.infer<typeof SalesOutputSchema>;
