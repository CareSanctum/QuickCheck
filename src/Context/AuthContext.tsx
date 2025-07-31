import * as React from 'react';
import { getItem, removeItem, KEYS } from '../Storage';
import { useAuthStatus } from '../Hooks/AuthStatus.hook';
import { useState } from 'react';

type AuthContextType = {
  authStatus: 'error' | 'success' | 'pending' ;
  user: any | null;
  isSignedIn: boolean;
  isSignedOut: boolean;
  token: string | null;
  setToken: (token: string | null) => void;
};

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {

  // Use the useAuthStatus hook with the token
  const [token, setToken] = useState<string | null>(() => getItem(KEYS.SESSION_TOKEN) ?? null);
  const { data: authStatusData, status: authStatus, error: authError } = useAuthStatus(token);

  const isSignedIn = authStatus === 'success';
  const isSignedOut = !isSignedIn;
  const user = (authStatusData as any)?.data?.user;

  const authContext = React.useMemo(
    () => ({
      authStatus,
      user,
      isSignedIn,
      isSignedOut,
      token,
      setToken,
    }),
    [authStatus, user, isSignedIn, isSignedOut, token, setToken]
  );

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
}
