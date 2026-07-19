import { create } from "zustand";
import { User } from "../types";
import { mockUser } from "../data/mock/user";

interface AuthState {
  user: User | null;
  isOnboarded: boolean;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setOnboarded: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: mockUser,
  isOnboarded: false,
  isAuthenticated: true,
  setUser: (user) => set({ user }),
  setOnboarded: (value) => set({ isOnboarded: value }),
  logout: () => set({ user: null, isAuthenticated: false, isOnboarded: false }),
}));
