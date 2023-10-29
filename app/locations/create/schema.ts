import { z } from "zod";

export const formStateSchema = z
  .object({
    name: z.string(),
    description: z
      .string()
      .optional()
      .transform((val) => val || undefined),
  })
  .strict();
export type FormState = z.infer<typeof formStateSchema>;
