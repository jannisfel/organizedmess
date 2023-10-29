import { z } from "zod";

export const formStateSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
  })
  .strict();
export type FormState = z.infer<typeof formStateSchema>;
