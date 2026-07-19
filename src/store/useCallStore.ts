import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CallRecord, CallRequest } from "../types";
import { mockCallHistory, mockCallRequests } from "../data/mock/user";
import { CALL_RATES } from "../constants";
import { mockGirls } from "../data/mock/girls";
import { zustandStorage } from "../services/storage";

interface CallState {
  isActive: boolean;
  activeGirlId: string | null;
  duration: number;
  callHistory: CallRecord[];
  callRequests: CallRequest[];
  startCall: (girlId: string, girlName: string) => void;
  endCall: () => void;
  tickDuration: () => void;
  acceptRequest: (requestId: string) => void;
  rejectRequest: (requestId: string) => void;
  sendRequest: (girlId: string) => void;
}

export const useCallStore = create<CallState>()(
  persist(
    (set, get) => ({
      isActive: false,
      activeGirlId: null,
      duration: 0,
      callHistory: mockCallHistory,
      callRequests: mockCallRequests,
      startCall: (girlId, _girlName) =>
        set({ isActive: true, activeGirlId: girlId, duration: 0 }),
      endCall: () => {
        const state = get();
        const activeGirl = mockGirls.find((g) => g.id === state.activeGirlId);
        const newRecord: CallRecord = {
          id: `c${Date.now()}`,
          girlId: state.activeGirlId || "",
          girlName: activeGirl?.name || "",
          girlAvatar: activeGirl?.avatar || "",
          duration: state.duration,
          cost: (state.duration / 60) * CALL_RATES.perMinute,
          status: "completed",
          timestamp: new Date().toLocaleString(),
        };
        set({
          isActive: false,
          activeGirlId: null,
          duration: 0,
          callHistory: [newRecord, ...state.callHistory],
        });
      },
      tickDuration: () => set((state) => ({ duration: state.duration + 1 })),
      acceptRequest: (requestId) =>
        set((state) => ({
          callRequests: state.callRequests.map((req) =>
            req.id === requestId ? { ...req, status: "accepted" as const } : req,
          ),
        })),
      rejectRequest: (requestId) =>
        set((state) => ({
          callRequests: state.callRequests.map((req) =>
            req.id === requestId ? { ...req, status: "rejected" as const } : req,
          ),
        })),
      sendRequest: (girlId) => {
        const girl = mockGirls.find((g) => g.id === girlId);
        set((state) => ({
          callRequests: [
            {
              id: `r${Date.now()}`,
              girlId,
              girlName: girl?.name || "",
              girlAvatar: girl?.avatar || "",
              girlRating: girl?.rating || 0,
              status: "pending",
              timestamp: "Just now",
              type: "outgoing",
            },
            ...state.callRequests,
          ],
        }));
      },
    }),
    {
      name: "call-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
