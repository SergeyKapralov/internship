export const apiClient = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(`https://api.poiskkino.dev/${path}`, {
    ...options,
    headers: {
      'X-API-KEY': import.meta.env.VITE_API_KEY,
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
};
