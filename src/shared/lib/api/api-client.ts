export const apiClient = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(`https://api.poiskkino.dev/v1.5${path}`, {
    ...options,
    headers: {
      'X-API-KEY': 'NX4GZVA-B0744WN-JY6WK8T-V87548Q',
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
};
