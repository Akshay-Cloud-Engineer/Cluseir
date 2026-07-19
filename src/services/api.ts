import { Girl, Notification, CallRecord, CallRequest } from "../types";
import { mockGirls } from "../data/mock/girls";
import { mockNotifications } from "../data/mock/notifications";
import { mockCallHistory, mockCallRequests } from "../data/mock/user";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  getGirls: async (): Promise<Girl[]> => {
    await delay(500);
    return mockGirls;
  },

  getGirlById: async (id: string): Promise<Girl | undefined> => {
    await delay(300);
    return mockGirls.find((g) => g.id === id);
  },

  getNotifications: async (): Promise<Notification[]> => {
    await delay(500);
    return mockNotifications;
  },

  getCallHistory: async (): Promise<CallRecord[]> => {
    await delay(400);
    return mockCallHistory;
  },

  getCallRequests: async (): Promise<CallRequest[]> => {
    await delay(400);
    return mockCallRequests;
  },

  searchGirls: async (query: string): Promise<Girl[]> => {
    await delay(300);
    return mockGirls.filter(
      (g) =>
        g.name.toLowerCase().includes(query.toLowerCase()) ||
        g.location.toLowerCase().includes(query.toLowerCase()) ||
        g.services.some((s) => s.toLowerCase().includes(query.toLowerCase())),
    );
  },

  filterGirls: async (filters: Record<string, unknown>): Promise<Girl[]> => {
    await delay(500);
    let results = [...mockGirls];
    const { minAge, maxAge, maxPrice, onlineOnly, verifiedOnly, services } = filters;
    if (typeof minAge === "number") results = results.filter((g) => g.age >= minAge);
    if (typeof maxAge === "number") results = results.filter((g) => g.age <= maxAge);
    if (typeof maxPrice === "number") results = results.filter((g) => g.price <= maxPrice);
    if (onlineOnly) results = results.filter((g) => g.isOnline);
    if (verifiedOnly) results = results.filter((g) => g.isVerified);
    if (Array.isArray(services) && services.length > 0) {
      results = results.filter((g) => services.some((s) => g.services.includes(s)));
    }
    return results;
  },
};
