import type { ProductDetail } from '@/entities/product';
import { get } from '@/shared/api';

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
    throw new Error('The data could not be loaded. Please try again later.');
  }
};
