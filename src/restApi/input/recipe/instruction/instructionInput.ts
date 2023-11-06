import z from "zod";

export const instructionInputSchema = z.object({
  priorityNumber: z.number().int().positive().max(9999),
  step: z.string().min(1).max(512),
});

export type InstructionInput = z.infer<typeof instructionInputSchema>;
