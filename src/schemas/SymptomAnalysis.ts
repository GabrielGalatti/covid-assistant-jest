import { z } from "zod";

export namespace SymptomAnalysis {
  export const input = z.object({
    message: z.string(),
  });

  export const output = z.object({
    hasFever: z.boolean(),
    feverDegree: z.number().nullable(),
    hasLossOfSmell: z.boolean(),
    hasBodyPain: z.boolean(),
  });

  export type Output = z.infer<typeof output>;
  export type Input = z.infer<typeof input>;
}
