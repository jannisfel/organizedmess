import { z } from "zod";

export const formStateSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    expiration: z
      .string()
      .optional()
      .transform((val) => (val ? new Date(val).toISOString() : undefined)),
    type: z.string().optional(),
    location: z.string(),
  })
  .strict();
export type FormState = z.infer<typeof formStateSchema>;
