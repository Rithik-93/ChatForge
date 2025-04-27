import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export type UserType = {
  email: string;
  name: string;
  id: string;
  avatar: string | null;
};

export interface AuthStore {
  user: UserType | null;
  statusChecked: boolean;
  updateUser: (_user: UserType | null) => void;
  checkStatus: () => Promise<void>;
  logout: () => void;
}

interface SignupStore {
  email: string | null;
  otp: number | null;
  updateEmail: (_email: string) => void;
}

interface VideoHeaders {
  userCount: number;
  updateUserCount: (_users: number) => void;
}

export const useVideoHeaders = create<VideoHeaders>((set) => ({
  userCount: 0,
  updateUserCount: (users: number) => {
    set({ userCount: users });
  },
}));

export const useSignupStore = create(
  persist<SignupStore>(
    (set) => ({
      email: null,
      otp: null,
      updateEmail: (email: string) => {
        set({ email });
      }
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      statusChecked: false,

      updateUser: (user) => {
        return set({ user: user });
      },
      logout: () => {
        set({ user: null, statusChecked: false });
      },
      checkStatus: async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/auth/user`, {
            withCredentials: true,
          });
          set({ user: response.data.user || null, statusChecked: true });
        } catch (_err) {
          set({ user: null, statusChecked: false });
        }
      },
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

