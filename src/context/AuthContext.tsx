// import React, { createContext, useState, useEffect, ReactNode } from "react";

// interface AuthState {
//   isAuthenticated: boolean;
//   token: string | null;
//   username: string | null;
//   user_type: string | null;
// }

// interface AuthContextType {
//   authState: AuthState;
//   login: (token: string, username: string, user_type: string) => void;
//   logout: () => void;
// }

// const initialAuthState: AuthState = {
//   isAuthenticated: false,
//   token: null,
//   username: null,
//   user_type: null,
// };

// export const AuthContext = createContext<AuthContextType>({
//   authState: initialAuthState,
//   login: () => {},
//   logout: () => {},
// });

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [authState, setAuthState] = useState<AuthState>(() => {
//     // Initialize auth state from localStorage
//     const token = localStorage.getItem("token");
//     const username = localStorage.getItem("name");
//     const user_type = localStorage.getItem("user_type");

//     return {
//       isAuthenticated: !!token,
//       token,
//       username,
//       user_type,
//     };
//   });

//   // Update localStorage when auth state changes
//   useEffect(() => {
//     if (authState.token) {
//       localStorage.setItem("token", authState.token);
//     } else {
//       localStorage.removeItem("token");
//     }

//     if (authState.username) {
//       localStorage.setItem("name", authState.username);
//     } else {
//       localStorage.removeItem("name");
//     }

//     if (authState.user_type) {
//       localStorage.setItem("user_type", authState.user_type);
//     } else {
//       localStorage.removeItem("user_type");
//     }
//   }, [authState.token, authState.username, authState.user_type]);

//   const login = (token: string, username: string, user_type: string) => {
//     setAuthState({
//       isAuthenticated: true,
//       token,
//       username,
//       user_type,
//     });
//   };

//   const logout = () => {
//     setAuthState({
//       isAuthenticated: false,
//       token: null,
//       username: null,
//       user_type: null,
//     });
//   };

//   const contextValue: AuthContextType = {
//     authState,
//     login,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
//   );
// };

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
} from "react";
import Swal from "sweetalert2";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  user_type: string | null;
}

interface AuthContextType {
  authState: AuthState;
  login: (token: string, username: string, user_type: string) => void;
  logout: () => void;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  token: null,
  username: null,
  user_type: null,
};

export const AuthContext = createContext<AuthContextType>({
  authState: initialAuthState,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Initialize auth state from localStorage
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const user_type = localStorage.getItem("user_type");

    return {
      isAuthenticated: !!token,
      token,
      username,
      user_type,
    };
  });

  const login = useCallback(
    (token: string, username: string, user_type: string) => {
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("user_type", user_type);

      setAuthState({
        isAuthenticated: true,
        token,
        username,
        user_type,
      });
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user_type");

    setAuthState(initialAuthState);
  }, []);

  // Auto logout after 15 minutes of inactivity
  useEffect(() => {
    const events = ["mousemove", "keydown", "scroll", "click"];
    let timeoutId: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        logout();
        Swal.fire({
          icon: "info",
          title: "Session expired",
          text: "You have been logged out due to inactivity.",
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/login";
        });
      }, 15 * 60 * 1000); // 15 minutes
    };

    // Attach events
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [logout]);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy use
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
