import React, { createContext, useEffect, useReducer } from "react";
import type { FC, ReactNode } from "react";
import jwtDecode from "jwt-decode";
import type { User } from "../types/user";
import axios, { userFormeAxiosInstance } from "../utils/axios";

import { Login } from "../apis/index";
import { toast } from "react-toastify";

interface AuthState {
  isInitialised: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthContextValue extends AuthState {
  method: "JWT";
  login: (email: string, password: string, role: number) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

type InitialiseAction = {
  type: "INITIALISE";
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type LoginAction = {
  type: "LOGIN";
  payload: {
    user: User;
  };
};

type LogoutAction = {
  type: "LOGOUT";
};

type RegisterAction = {
  type: "REGISTER";
  payload: {
    user: User;
  };
};

type Action = InitialiseAction | LoginAction | LogoutAction | RegisterAction;

const initialAuthState: AuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const isValidToken = (accessToken: string): boolean => {
  if (!accessToken) {
    return false;
  }

  const decoded: any = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = async (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    userFormeAxiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
    delete userFormeAxiosInstance.defaults.headers.common.Authorization;
  }
};

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "INITIALISE": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case "LOGIN": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case "REGISTER": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext<AuthContextValue>({
  ...initialAuthState,
  method: "JWT",
  login: () => {},
  logout: () => {},
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const login = async (_email: string, _password: string, _role: number) => {
    try {
      var { email, role, status, token, userName, errMsg } = {
        email: "",
        role: 0,
        status: 400,
        token: "",
        userName: "",
        errMsg: "",
      };

      await Login({ email: _email, password: _password, role: _role }).then(
        (data: any) => {
          status = data.status;
          if (data.status == 200) {
            email = data.email;
            role = data.role;
            token = data.token;
            userName = data.userName;
          } else {
            errMsg = data.message;
          }
        }
      );

      const user: User = {
        email: email,
        userName: userName,
        role: role,
      };

      if (status && status === 200) {
        await setSession(token);
        dispatch({
          type: "LOGIN",
          payload: {
            user,
          },
        });
        return 1;
      } else if (status && status === 400) {
        toast.error(errMsg);
        return -1;
      } else {
        return -1;
      }
    } catch {
      return -1;
    }
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    const initialise = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          await setSession(accessToken);

          // const response = await axios.post<{ user: User }>("/api/auth/me");
          // const { user } = response.data;
          const token: any = jwtDecode(accessToken);
          const user: User = {
            email: token.email,
            userName: token.name,
            role: token.role,
          };
          dispatch({
            type: "INITIALISE",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: "INITIALISE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALISE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialise();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
