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

interface AuthContext {
  currentUser: User | null;
  currentUserData: UserData | null;
  loadingUser: boolean;
  loadingUserData: boolean;
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
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [loadingUserData, setLoadingUserData] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(
      async (user) => {
        setCurrentUser(user);
        if (user && user.email && !currentUserData) {
          const currentUserDataRetrieved = await findUserByEmail(user.email);
          setCurrentUserData({ ...currentUserDataRetrieved } as UserData);
          setLoadingUserData(false);
        }
        setError(null);
        setLoadingUser(false);
      },
      (error) => {
        setCurrentUser(null);
        setError(error.message);
        setLoadingUser(false);
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
      setLoadingUser(true);
      await createUserWithEmailAndPassword(authService, email, password);
      // Handle errors during SignUp
      setLoadingUserData(true);
      const createdUserRef = await createUser(userData);
      if (createdUserRef) {
        const currentUserDataRetrieved = await findUserByEmail(email);
        setCurrentUserData({ ...currentUserDataRetrieved } as UserData);
      }
      setLoadingUserData(false);
      // Handle errors creating the user
    } catch (error) {
      setCurrentUser(null);
      setLoadingUser(false);
      setLoadingUserData(false);
    }
  };

  const logIn = async (email: string, password: string) => {
    try {
      setLoadingUser(true);
      setLoadingUserData(true);
      await signInWithEmailAndPassword(authService, email, password);
      // Handle errors during Login
      const currentUserDataRetrieved = await findUserByEmail(email);
      setCurrentUserData({ ...currentUserDataRetrieved } as UserData);
      setLoadingUserData(false);
      // Handle errors retrieving the users data
    } catch (error) {
      setCurrentUser(null);
      setLoadingUser(false);
      setLoadingUserData(false);
    }
  };

  const logOut = async () => {
    setLoadingUser(true);
    setLoadingUserData(true);
    await authService.signOut();
    setCurrentUserData(null);
    setLoadingUserData(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentUserData,
        loadingUser: loadingUser,
        loadingUserData: loadingUserData,
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
