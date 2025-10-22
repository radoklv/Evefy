import { z } from "zod";

// Agent 1: Extractor
export const ExtractionSchema = z.object({
  facts: z.array(z.string())
});
export type ExtractionOutput = z.infer<typeof ExtractionSchema>;