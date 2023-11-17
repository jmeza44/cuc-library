import { useState, useEffect, ReactNode } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "../../services/FirebaseService";
import { authService } from "../../services/FirebaseService";
import React from "react";
import {
  UserData,
  createUser,
  findUserByEmail,
} from "../../services/UserService";
import { Navigate } from "react-router-dom";

interface AuthContext {
  currentUser: User | null;
  currentUserData: UserData | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string, userData: UserData) => void;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
}

export const AuthContext = React.createContext<AuthContext | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentUserData, setCurrentUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(
      (user) => {
        setCurrentUser(user);
        setError(null);
        setLoading(false);
      },
      (error) => {
        setCurrentUser(null);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    userData: UserData
  ) => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(authService, email, password);
      // Handle errors during SignUp
      const createdUserRef = await createUser(userData);
      if (createdUserRef) {
        const currentUserDataRetrieved = await findUserByEmail(email);
        setCurrentUserData({ ...currentUserDataRetrieved } as UserData);
        Navigate({ to: "/", replace: true, relative: "route" });
      }
      // Handle errors creating the user
    } catch (error) {
      setCurrentUser(null);
      setLoading(false);
    }
  };

  const logIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(authService, email, password);
      // Handle errors during Login
      const currentUserDataRetrieved = await findUserByEmail(email);
      setCurrentUserData({ ...currentUserDataRetrieved } as UserData);
      // Handle errors retrieving the users data
    } catch (error) {
      setCurrentUser(null);
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    await authService.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentUserData,
        loading,
        error,
        logIn,
        logOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default useAuth;
