// src/auth/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { auth } from "../Firebase"; // ← our firebase.js export
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1) Listen for Firebase auth state changes on mount:
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // firebaseUser is an object: { uid, email, etc. }
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2) login() calls Firebase's signInWithEmailAndPassword:
  function login({ email, password }) {
    // Returns a Promise so Login.js can handle .catch
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // userCredential.user is the logged-in user
        setUser(userCredential.user);
        return userCredential.user;
      });
  }

  // 3) logout() calls Firebase's signOut():
  function logout() {
    return signOut(auth).then(() => {
      setUser(null);
      navigate("/login");
    });
  }

  const value = {
    user,
    login,
    logout,
  };

  // 4) While Firebase initializes (checking localStorage/session), block rendering:
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
