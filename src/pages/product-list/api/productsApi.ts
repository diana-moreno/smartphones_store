import type { ProductSummary } from '@/entities/product';
import { get } from '@/shared/api';

export const getProducts = async (
  search: string,
  limit: number,
  offset: number = 0,
  signal?: AbortSignal
): Promise<ProductSummary[]> => {
  try {
    return await get<ProductSummary[]>(
      `/products?search=${search}&limit=${limit}&offset=${offset}`,
      signal
    );
  } catch (e) {
    const status = (e as { status?: number }).status;
    if (status === 401) {
      throw new Error('You are not authorized to access the catalog.');
    }
    throw new Error('The data could not be loaded. Please try again later.');
  }
};
