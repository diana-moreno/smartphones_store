import { get } from '../../../shared/api/client';
import type { ProductSummary, ProductDetail } from '../model/product';

const GENERIC_ERROR = 'The data could not be loaded. Please try again later.';

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
    throw new Error(GENERIC_ERROR);
  }
};

export const getProductById = async (id: string): Promise<ProductDetail> => {
  try {
    return await get<ProductDetail>(`/products/${id}`);
  } catch (e) {
    const status = (e as { status?: number }).status;
    if (status === 401) {
      throw new Error('You are not authorized to access this product.');
    }
    if (status === 404) {
      throw new Error('The product you are looking for does not exist.');
    }
    throw new Error(GENERIC_ERROR);
  }
};
