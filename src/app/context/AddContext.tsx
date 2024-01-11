"use client"

import { createContext, useContext, useState, useEffect } from "react";

interface IAuthContextProps {
  user: string;
  setUser: (_: string) => void;
  isAdmin: boolean;
  setIsAdmin: (_: boolean) => void;
  isAuth: boolean;
  setIsAuth: (_: boolean) => void;
  signupSuccess: boolean;
  setSignupSuccess: (_: boolean) => void;
  signinSuccess: boolean;
  setSigninSuccess: (_: boolean) => void;
}

const defaultValue: IAuthContextProps = {
  user: "",
  setUser: (_: string) => {},
  isAdmin: false,
  setIsAdmin: (_: boolean) => {},
  isAuth: false,
  setIsAuth: (_: boolean) => {},
  signupSuccess: false,
  setSignupSuccess: (_: boolean) => {},
  signinSuccess: false,
  setSigninSuccess: (_: boolean) => {}
};

const AuthContext = createContext<IAuthContextProps>(defaultValue);

interface IAppWrapperProps {
  children: React.ReactNode;
}

export function AppWrapper({ children }: IAppWrapperProps) {
  const [currentUser, setCurrentUser] = useState<string>("");
  const [admin, setAdmin] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [signupSuccess, setSignupSuccess] = useState<boolean>(false);
  const [signinSuccess, setSigninSuccess] = useState<boolean>(false);

  useEffect(() => {
    const user: string | null = localStorage.getItem("user");
    setCurrentUser(user && JSON.parse(user));
    if (user) {
      setIsAuthenticated(true);
      const admin = JSON.parse(user).admin;
      setAdmin(admin == "0" ? false : true);
    }
  }, []);

  const sharedState = {
    user: currentUser,
    setUser: setCurrentUser,
    isAdmin: admin,
    setIsAdmin: setAdmin,
    isAuth: isAuthenticated,
    setIsAuth: setIsAuthenticated,
    signupSuccess: signupSuccess,
    setSignupSuccess: setSignupSuccess,
    signinSuccess: signinSuccess,
    setSigninSuccess: setSigninSuccess
  };

  return (
    <AuthContext.Provider value={sharedState}>{children}</AuthContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AuthContext);
}
