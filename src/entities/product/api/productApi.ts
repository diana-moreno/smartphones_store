import { get } from '../../../shared/api/client';
import type { ProductSummary, ProductDetail } from '../model/product';

const GENERIC_ERROR =
  'No ha sido posible cargar los datos. Inténtalo de nuevo más tarde.';

export const getProducts = async (
  search?: string,
  signal?: AbortSignal
): Promise<ProductSummary[]> => {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  try {
    return await get<ProductSummary[]>(`/products${query}`, signal);
  } catch (e) {
    const status = (e as { status?: number }).status;
    if (status === 401) {
      throw new Error('No estás autorizado para acceder al catálogo.');
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
      throw new Error('No estás autorizado para acceder a este producto.');
    }
    if (status === 404) {
      throw new Error('El producto que buscas no existe.');
    }
    throw new Error(GENERIC_ERROR);
  }
};
