import { ObjectId } from "mongodb";
import { Instruction } from "../../../domain/types/recipe/instruction";
import { InstructionModel } from "./instructionModel";

export function mapInstructionModelToInstruction(
  instructionModel: InstructionModel
): Instruction {
  return {
    id: instructionModel.id.toHexString(),
    priorityNumber: instructionModel.priorityNumber,
    step: instructionModel.step,
  };
}

export function mapInstructionToInstructionModel(
  instruction: Instruction
): InstructionModel {
  return {
    id: new ObjectId(),
    priorityNumber: instruction.priorityNumber,
    step: instruction.step,
  };
}
