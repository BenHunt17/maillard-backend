import { adminsDataAccessGetAll } from "../dataAccess/admin/adminsDataAccess";
import { ApiError } from "../domain/types/common/apiError";

export async function isAdminOrThrow(
  googleId: string | undefined,
  googleEmail: string | undefined
) {
  const admins = await adminsDataAccessGetAll();

  if (
    !admins.some(
      (admin) =>
        admin.googleId === googleId && admin.googleEmail === googleEmail
    )
  ) {
    throw new ApiError("User not an admin", 403);
  }
}
