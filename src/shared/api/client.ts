const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

if (!baseUrl || !apiKey) {
  throw new Error('VITE_API_BASE_URL and VITE_API_KEY must be defined');
}

export const get = async <T>(
  path: string,
  signal?: AbortSignal
): Promise<T> => {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { 'x-api-key': apiKey },
    signal,
  });
  if (!response.ok) {
    throw Object.assign(new Error(`API ${response.status}`), {
      status: response.status,
    });
  }
  return response.json() as Promise<T>;
};
