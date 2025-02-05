export const LocalStorageService = {
  get(key: string): string | null {
    return localStorage.getItem(key);
  },

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  },
};
