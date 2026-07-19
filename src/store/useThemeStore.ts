import { create } from "zustand";

type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: "dark",
  toggleTheme: () => {
    const newMode = get().mode === "light" ? "dark" : "light";
    set({ mode: newMode });
  },
  setTheme: (mode: ThemeMode) => set({ mode }),
}));
