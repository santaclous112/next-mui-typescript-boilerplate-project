"use client"

import { createContext, useContext, useState, useEffect } from "react";

interface IAuthContextProps {
  isAuth: boolean;
  setIsAuth: (_: boolean) => void;
  signupSuccess: boolean;
  setSignupSuccess: (_: boolean) => void;
  signinSuccess: boolean;
  setSigninSuccess: (_: boolean) => void;
}

const defaultValue: IAuthContextProps = {
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [signupSuccess, setSignupSuccess] = useState<boolean>(false);
  const [signinSuccess, setSigninSuccess] = useState<boolean>(false);

  useEffect(() => {
    const user: string | null = localStorage.getItem("auth");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const sharedState = {
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
