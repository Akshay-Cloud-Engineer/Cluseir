export interface Girl {
  id: string;
  name: string;
  age: number;
  avatar: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  currency: string;
  bio: string;
  services: string[];
  availability: string;
  languages: string[];
  interests: string[];
  photos: string[];
  isOnline: boolean;
  isVerified: boolean;
  lastActive: string;
  responseTime: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  location: string;
  credits: number;
  preferences: UserPreferences;
}

export interface UserPreferences {
  minAge: number;
  maxAge: number;
  location: string;
  language: string;
  sortBy: "rating" | "price" | "distance";
}

export interface Notification {
  id: string;
  type: "call_request" | "call_end" | "message" | "system";
  title: string;
  message: string;
  avatar?: string;
  userId?: string;
  read: boolean;
  createdAt: string;
}

export interface CallRecord {
  id: string;
  girlId: string;
  girlName: string;
  girlAvatar: string;
  duration: number;
  cost: number;
  status: "completed" | "missed" | "cancelled";
  timestamp: string;
}

export interface CallRequest {
  id: string;
  girlId: string;
  girlName: string;
  girlAvatar: string;
  girlRating: number;
  status: "pending" | "accepted" | "rejected" | "expired";
  timestamp: string;
  type: "incoming" | "outgoing";
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface FilterOptions {
  minAge: number;
  maxAge: number;
  location: string;
  language: string;
  minRating: number;
  maxPrice: number;
  services: string[];
  onlineOnly: boolean;
  verifiedOnly: boolean;
}
