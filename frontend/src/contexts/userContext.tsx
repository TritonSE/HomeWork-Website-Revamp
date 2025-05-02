"use client";

import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

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
