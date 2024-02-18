import { WithId } from "mongodb";
import { AdminModel } from "./adminModel";
import { Admin } from "../../domain/types/admin/admin";

export function mapAdminModelToAdmin(adminModel: WithId<AdminModel>): Admin {
  return {
    id: adminModel._id.toHexString(),
    googleEmail: adminModel.googleEmail,
    googleId: adminModel.googleId,
  };
}
