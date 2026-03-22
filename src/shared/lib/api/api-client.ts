export const apiClient = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(`https://api.poiskkino.dev/${path}`, {
    ...options,
    headers: {
      'X-API-KEY': 'XMFA7V4-RSB44M0-MTSRYKK-7ATFNBQ',
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
};
