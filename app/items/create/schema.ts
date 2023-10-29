import { z } from "zod";

export const formStateSchema = z
  .object({
    name: z.string(),
    description: z
      .string()
      .optional()
      .transform((val) => val || undefined),
    expires_at: z
      .string()
      .optional()
      .transform((val) => (val ? new Date(val).toISOString() : undefined)),
    item_type: z
      .string()
      .optional()
      .transform((val) => val || undefined),
    location: z
      .string()
      .optional()
      .transform((val) => val || undefined),
  })
  .strict();
export type FormState = z.infer<typeof formStateSchema>;
