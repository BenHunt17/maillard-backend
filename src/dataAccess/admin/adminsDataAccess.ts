import { Admin } from "../../domain/types/admin/admin";
import { getDb } from "../dbConfig";
import { AdminModel } from "./adminModel";
import { mapAdminModelToAdmin } from "./adminModelMappers";

export async function adminsDataAccessGetAll(): Promise<Admin[]> {
  const adminsCollection = await getAdminsCollection();

  const adminModels = await adminsCollection.find().toArray();

  return adminModels.map((adminModel) => mapAdminModelToAdmin(adminModel));
}

async function getAdminsCollection() {
  const db = await getDb();
  return db.collection<AdminModel>("admins");
}
