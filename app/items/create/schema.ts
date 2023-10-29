import { z } from "zod";

export const formStateSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    expires_at: z
      .string()
      .optional()
      .transform((val) => (val ? new Date(val).toISOString() : undefined)),
    item_type: z.string().optional(),
    location: z.string(),
  })
  .strict();
export type FormState = z.infer<typeof formStateSchema>;
