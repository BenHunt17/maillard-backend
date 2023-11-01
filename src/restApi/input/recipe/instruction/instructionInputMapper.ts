import { Instruction } from "../../../../domain/types/recipe/instruction";
import { InstructionInput } from "./instructionInput";

export function mapInstructionInputToInstruction(
  InstructionInput: InstructionInput
): Instruction {
  return {
    id: "",
    step: InstructionInput.step,
    priorityNumber: InstructionInput.priorityNumber,
  };
}
