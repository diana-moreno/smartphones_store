import { get } from '../../../shared/api/client';
import type { ProductSummary, ProductDetail } from '../model/product';

const GENERIC_ERROR =
  'No ha sido posible cargar los datos. Inténtalo de nuevo más tarde.';

const toHttps = (url: string) => url.replace(/^http:\/\//, 'https://');

const normalizeSummary = (p: ProductSummary): ProductSummary => ({
  ...p,
  imageUrl: toHttps(p.imageUrl),
});

const normalizeDetail = (p: ProductDetail): ProductDetail => ({
  ...p,
  colorOptions: p.colorOptions.map((c) => ({ ...c, imageUrl: toHttps(c.imageUrl) })),
  similarProducts: p.similarProducts.map(normalizeSummary),
});

export const getProducts = async (
  search?: string,
  signal?: AbortSignal
): Promise<ProductSummary[]> => {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  try {
    const data = await get<ProductSummary[]>(`/products${query}`, signal);
    return data.map(normalizeSummary);
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
    const data = await get<ProductDetail>(`/products/${id}`);
    return normalizeDetail(data);
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
