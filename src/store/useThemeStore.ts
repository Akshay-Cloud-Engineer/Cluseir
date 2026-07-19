import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Appearance } from "react-native";
import { zustandStorage } from "../services/storage";

type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: Appearance.getColorScheme() === "light" ? "light" : "dark",
      toggleTheme: () => {
        const newMode = get().mode === "light" ? "dark" : "light";
        set({ mode: newMode });
      },
      setTheme: (mode: ThemeMode) => set({ mode }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
