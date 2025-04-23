"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "@/contexts/userContext";

export const useRedirectToLogin = () => {
  const { loading, firebaseUser } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !firebaseUser) router.replace("/login");
  }, [loading, firebaseUser, router]);
};

export const useRedirectToAdminIfLoggedIn = () => {
  const { loading, firebaseUser } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (!loading && firebaseUser) router.replace("/admin");
  }, [loading, firebaseUser, router]);
};
