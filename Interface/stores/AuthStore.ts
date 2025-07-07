import { create } from "zustand";
import { User } from "@/types/user";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
    user: null | User;
    setUser: (user: User) => void;
    nextUrl: string | null;
    setNextUrl: (nextUrl: string) => void;
    isAuthenticated: () => boolean;
    logout: () => void;
}

const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            nextUrl: null,
            isAuthenticated: () => !!get().user,
            setUser: (user) => set({ user }),
            setNextUrl: (nextUrl) => set({ nextUrl }),
            logout: () => set({ user: null })
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => sessionStorage)
        })
);

export default useAuthStore;