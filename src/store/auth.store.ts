"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, LoginData, RegisterData } from "@/types/user";
import { authService } from "@/services/auth.service";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  register: (data: RegisterData) => User;
  login: (data: LoginData) => User;
  logout: () => void;
  updateProfile: (data: { name: string; email: string }) => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      register: (data) => {
        const user = authService.register(data);

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        return user;
      },

      login: (data) => {
        const user = authService.login(data);

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        return user;
      },
      updateProfile: (data) => {
        const currentUser = authService.getCurrentUser();

        if (!currentUser) {
          throw new Error("ابتدا وارد حساب کاربری شوید.");
        }

        const user = authService.updateProfile(currentUser.id, data);

        set({ user, isAuthenticated: true });
      },

      logout: () => {
        authService.logout();

        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      initialize: () => {
        const user = authService.getCurrentUser();

        set({
          user,
          isAuthenticated: !!user,
          isLoading: false,
        });
      },
    }),

    {
      name: "parna-auth",
      skipHydration: true,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
