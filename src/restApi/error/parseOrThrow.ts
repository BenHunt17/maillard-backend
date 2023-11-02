import { ZodError, ZodType, z } from "zod";
import { ApiError } from "../../domain/types/common/apiError";

export function parseOrThrow<T extends ZodType>(
  z: T,
  data: unknown
): z.infer<T> {
  try {
    return z.parse(data);
  } catch (e) {
    if (e instanceof ZodError) {
      throw new ApiError(e.message, 400);
    }
    throw new ApiError(JSON.stringify(e), 400);
  }
}
