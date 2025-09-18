import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; // StateStorage 추가

import type { User } from "@/types/authType";

interface AuthStore {
  user: User | null;
  setUserName: (userData: User | null) => void;
  deleteUser: () => void;

  currentTheme: string;
  setCurrentTheme: (themeClass: string) => void;
}

// 실제로 persist될 상태의 타입 정의
type PersistedAuthState = Pick<AuthStore, "user" | "currentTheme">;

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null, // 초기값
      setUserName: (userData: User | null) => set({ user: userData }),
      deleteUser: () => {
        set({ user: null });
      },

      currentTheme: "dark", // 기본 값 (다크)
      setCurrentTheme: (themeClass: string) => {
        set({ currentTheme: themeClass });
        document.documentElement.className = themeClass;
      },
    }),
    {
      name: "authenticate-storage", // 로컬 스토리지에 저장될 키 이름
      storage: createJSONStorage(() => localStorage), // 사용할 스토리지

      // partialize 함수의 반환 타입을 명시적으로 지정
      partialize: (state): PersistedAuthState => ({
        user: state.user, // persist할 상태
        currentTheme: state.currentTheme,
      }),
    }
  )
);

export default useAuthStore;
