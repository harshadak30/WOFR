
import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of our authentication state
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
}

// Define the shape of our context
interface AuthContextType {
  authState: AuthState;
  login: (token: string, username: string) => void;
  logout: () => void;
}

// Create the initial state
const initialAuthState: AuthState = {
  isAuthenticated: false,
  token: null,
  username: null,
};

// Create the context with a default value
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
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('name');
    
    return {
      isAuthenticated: !!token,
      token,
      username,
    };
  });

  // Update localStorage when auth state changes
  useEffect(() => {
    if (authState.token) {
      localStorage.setItem('token', authState.token);
    } else {
      localStorage.removeItem('token');
    }
    
    if (authState.username) {
      localStorage.setItem('name', authState.username);
    } else {
      localStorage.removeItem('name');
    }
  }, [authState.token, authState.username]);

  const login = (token: string, username: string) => {
    setAuthState({
      isAuthenticated: true,
      token,
      username,
    });
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      token: null,
      username: null,
    });
  };

  const contextValue: AuthContextType = {
    authState,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
