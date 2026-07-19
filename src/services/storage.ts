import { MMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

const mmkv = new MMKV({ id: "cluseir-storage" });

export const zustandStorage: StateStorage = {
  getItem: (name: string): string | null => {
    const value = mmkv.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string): void => {
    mmkv.set(name, value);
  },
  removeItem: (name: string): void => {
    mmkv.delete(name);
  },
};

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
