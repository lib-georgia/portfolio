import { createContext, useState, useContext, useEffect } from 'react';
// import { FirebaseApp } from "../firebaseApp";
import { getAuth } from "firebase/auth";

const AuthContext = createContext();

export function useAuthCont() {
    return useContext(AuthContext);
  }

export function AuthProvider({ children }) {
    // const auth = getAuth(FirebaseApp);
    const auth = getAuth();
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
  
    const value = {
      user,
      loading,
    };

    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user) => {
          setUser(user);
          setLoading(false);
        });
        return () => {
          unsubscribed();
        };
      }, []);

    return (
        <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    )
}