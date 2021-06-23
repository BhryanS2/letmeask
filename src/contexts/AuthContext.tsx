import { createContext, ReactNode, useEffect, useState } from "react";

import { auth, firebase } from "../services/firebase";

type User = {
  id: string,
  name: string,
  avatar: string

}

type AuthContextProps = {
  user: User | undefined,
  SignInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider(props: AuthContextProviderProps) {

  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user
        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Accont.");
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  async function SignInWithGoogle() {
    const Provider = new firebase.auth.GoogleAuthProvider();
    const response = await auth.signInWithPopup(Provider)

    if (response.user) {
      const { displayName, photoURL, uid } = response.user
      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Accont.");
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }
  return (
    <AuthContext.Provider value={{ user, SignInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}