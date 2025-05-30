"use client";

import { User as FirebaseUser, onAuthStateChanged, signOut } from "firebase/auth";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { initFirebase } from "@/firebase/firebase";

type AuthState = {
  loading: boolean;
  firebaseUser: FirebaseUser | null;
  logout: () => Promise<void>;
};
const UserContext = createContext<AuthState>({
  loading: true,
  firebaseUser: null,
  logout: () => Promise.resolve(),
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const { auth } = initFirebase();
  const [state, setState] = useState<Omit<AuthState, "logout">>({
    loading: true,
    firebaseUser: null,
  });
  const logout = () => signOut(auth);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setState({ loading: false, firebaseUser: fbUser });
    });
    return unsubscribe;
  }, [auth]);

  return <UserContext.Provider value={{ ...state, logout }}>{children}</UserContext.Provider>;
};

export const useAuthState = () => useContext(UserContext);
