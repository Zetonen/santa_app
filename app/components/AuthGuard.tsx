"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";
import api from "../api";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { token, user, _hasHydrated, clearAuth, setAuth, setRefreshAuth } =
    useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!_hasHydrated) return;

    const checkAuth = async () => {
      if (!token) {
        if (pathname !== "/login") {
          router.replace("/login");
        } else {
          setIsChecking(false); 
        }
        return;
      }

      try {
        const data = await api.refresh(token);
        console.log(data);
        setRefreshAuth(data);

        if (pathname === "/login" || pathname === "/") {
          router.replace("/recipient");
        } else if (pathname === "/recipient") {
          setIsChecking(false);
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        clearAuth();
        router.replace("/login");
      }
    };

    checkAuth();
  }, [_hasHydrated, token, pathname, router, clearAuth, setRefreshAuth]);

  if (!_hasHydrated || isChecking) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-white">
        Завантаження...
      </div>
    );
  }

  return <>{children}</>;
}
