import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, CandidateProfile } from '../types';
import { api, setAuthToken, getAuthToken } from '../services/api';

interface AuthContextType {
  user: User | null;
  candidate: CandidateProfile | null;
  loading: boolean;
  login: (credentials: any) => Promise<any>;
  register: (data: any) => Promise<any>;
  googleLogin: (data: any) => Promise<any>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateCandidateState: (data: Partial<CandidateProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [candidate, setCandidate] = useState<CandidateProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const token = getAuthToken();
    if (!token) {
      setUser(null);
      setCandidate(null);
      setLoading(false);
      return;
    }

    try {
      const data = await api.getMe();
      if (data.success && data.user) {
        setUser(data.user);
        setCandidate(data.candidate || null);
      } else {
        setAuthToken(null);
        setUser(null);
        setCandidate(null);
      }
    } catch (err) {
      console.error('Failed to restore session:', err);
      setAuthToken(null);
      setUser(null);
      setCandidate(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (credentials: any) => {
    const data = await api.login(credentials);
    if (data.success && data.token) {
      setAuthToken(data.token);
      setUser(data.user);
      setCandidate(data.candidate);
    }
    return data;
  };

  const register = async (formData: any) => {
    const data = await api.register(formData);
    if (data.success && data.token) {
      setAuthToken(data.token);
      setUser(data.user);
      setCandidate(data.candidate);
    }
    return data;
  };

  const googleLogin = async (googleData: any) => {
    const data = await api.googleLogin(googleData);
    if (data.success && data.token) {
      setAuthToken(data.token);
      setUser(data.user);
      setCandidate(data.candidate);
    }
    return data;
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    setCandidate(null);
  };

  const updateCandidateState = (data: Partial<CandidateProfile>) => {
    if (candidate) {
      setCandidate({ ...candidate, ...data });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        candidate,
        loading,
        login,
        register,
        googleLogin,
        logout,
        refreshUser,
        updateCandidateState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

