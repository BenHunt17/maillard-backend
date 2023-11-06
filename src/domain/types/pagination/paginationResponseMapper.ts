import { PaginatedResponse } from "./paginatedResponse";

export function mapItemsToPaginatedResponse<T>(
  items: T[],
  offset: number,
  total: number
): PaginatedResponse<T> {
  return {
    items,
    offset,
    total,
  };
}
