import { create } from "zustand";

type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
  showToast: (message: string, type: ToastType, duration?: number) => void;
  hideToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  showToast: (message, type, duration = 3000) => {
    const id = Date.now().toString();
    set((state) => ({ toasts: [...state.toasts, { id, message, type, duration }] }));
    setTimeout(() => {
      get().hideToast(id);
    }, duration);
  },
  hideToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
