"use client";

import { User as FirebaseUser, onAuthStateChanged, signOut } from "firebase/auth";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { verifyUser } from "@/api/user";
import { initFirebase } from "@/firebase/firebase";

type AuthState = {
  loading: boolean;
  firebaseUser: FirebaseUser | null;
  logout: () => Promise<void>;
  privileged: boolean;
};
const UserContext = createContext<AuthState>({
  loading: true,
  firebaseUser: null,
  logout: () => Promise.resolve(),
  privileged: false,
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const { auth } = initFirebase();
  const [state, setState] = useState<{ loading: boolean; firebaseUser: FirebaseUser | null }>({
    loading: true,
    firebaseUser: null,
  });
  const [privileged, setPrivileged] = useState<boolean>(false);
  const logout = () => signOut(auth);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setState({ loading: false, firebaseUser: fbUser });
      void updatePrivilege(fbUser);
    });
    return unsubscribe;
  }, [auth]);

  const updatePrivilege = async (fbUser: FirebaseUser | null) => {
    if (fbUser !== null) {
      const token = await fbUser.getIdToken();
      const result = await verifyUser(token);
      if (result.success) {
        setPrivileged(result.data.privileged ?? false);
      }
    }
  };

  return (
    <UserContext.Provider value={{ ...state, logout, privileged }}>{children}</UserContext.Provider>
  );
};

export const useAuthState = () => useContext(UserContext);
