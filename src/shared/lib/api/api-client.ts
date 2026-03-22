export const apiClient = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(`https://api.poiskkino.dev/${path}`, {
    ...options,
    headers: {
      'X-API-KEY': 'W42W4XB-F28MN0N-PJKZ0HK-N44DEDC',
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
};
