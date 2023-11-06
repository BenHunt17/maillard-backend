import { ObjectId } from "mongodb";

export interface InstructionModel {
  id: ObjectId;
  priorityNumber: number;
  step: string;
}
