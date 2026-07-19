import { MMKV } from "react-native-mmkv";

const mmkv = new MMKV({ id: "cluseir-storage" });

export const storageService = {
  get: async (key: string): Promise<string | null> => {
    return mmkv.getString(key) ?? null;
  },
  set: async (key: string, value: string): Promise<void> => {
    mmkv.set(key, value);
  },
  delete: async (key: string): Promise<void> => {
    mmkv.delete(key);
  },
  clearAll: async (): Promise<void> => {
    mmkv.clearAll();
  },
};
