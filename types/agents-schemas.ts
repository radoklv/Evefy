import { z } from "zod";

export const ValidatorOutputSchema = z
  .object({
    req: z.array(z.string()).max(3).max(3), // deduplicated requirements
    assump: z.array(z.string()).max(3),
    dl: z.string(), // ISO-8601 deadline
  })
  .strict();

export const ArchitectOutputSchema = z
  .object({
    archOve: z.string(),
    comp: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          purpose: z.string(),
        })
      )
      .max(5),
    risks: z.array(z.string()).max(3),
  })
  .strict();

export const AnalystOutputSchema = z
  .object({
    epics: z.array(
      z.object({
        descr: z.string(),
        accCrit: z.string(),
      })
    ),
    workfprce: z.array(
      z.object({
        role: z.string(),
      })
    ),
  })
  .strict();

export const HumanResourceOutputSchema = z
  .object({
    lineItems: z.array(
      z.object({
        role: z.string(),
        count: z.number().int().positive(),
        subt: z.number().positive(),
      })
    ),
    totalCo: z.number().positive(), // was 'total'
  })
  .strict();

export const SalesOutputSchema = z
  .object({
    title: z.string(),
    summary: z.string(),
    scope: z.string(),
    timeline: z.object({
      start: z.string(),
      end: z.string(),
    }),
    workforce: z.array(
      z.object({
        role: z.string(),
        cost: z.number().positive(),
        count: z.number().int().positive(),
      })
    ),
    total: z.number().positive(),
    assumption: z.array(z.string()),
    terms: z.string(),
    next: z.array(z.string()),
    notes: z.string(),
  })
  .strict();

export type ValidatorOutput = z.infer<typeof ValidatorOutputSchema>;
export type SolutionArchitectOutput = z.infer<typeof ArchitectOutputSchema>;
export type ProjectAnalystOutput = z.infer<typeof AnalystOutputSchema>;
export type HumanResourceOutput = z.infer<typeof HumanResourceOutputSchema>;
export type SalesOutput = z.infer<typeof SalesOutputSchema>;
