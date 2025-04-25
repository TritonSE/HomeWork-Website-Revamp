"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { initFirebase } from "@/firebase/firebase";

type AuthState =
  | { loading: true; firebaseUser: null }
  | { loading: false; firebaseUser: FirebaseUser | null };

const UserContext = createContext<AuthState>({ loading: true, firebaseUser: null });

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const { auth } = initFirebase();
  const [state, setState] = useState<AuthState>({ loading: true, firebaseUser: null });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setState({ loading: false, firebaseUser: fbUser });
    });
    return unsubscribe;
  }, [auth]);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

export const useAuthState = () => useContext(UserContext);
