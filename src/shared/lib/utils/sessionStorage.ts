export const getFromSessionStorage = <T>(item: string): T | null => {
  const data = sessionStorage.getItem(item);
  return data ? JSON.parse(data) : null;
};

export const setToSessionStorage = <T>(item: string, value: T): void => {
  sessionStorage.setItem(item, JSON.stringify(value));
};
