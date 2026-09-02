import React, { createContext, useContext, useState } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (emailOrUsername: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: UserProfile = {
  id: 'usr_squi_101',
  email: 'mindful.squirrel@squi.health',
  fullName: 'Sam Squirrel',
  targetDailySugarG: 25,
  targetDailySodiumMg: 2000,
  targetDailyCaloriesKcal: 2000,
  targetDailyWaterMl: 2500,
  currentWeightKg: 68.5,
  targetWeightKg: 65.0,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (emailOrUsername: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (!emailOrUsername.trim()) {
        return { success: false, error: 'Please enter your username or email.' };
      }
      if (!pass || pass.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters.' };
      }

      const mockName = emailOrUsername.includes('@')
        ? emailOrUsername.split('@')[0].replace('.', ' ')
        : emailOrUsername;

      const loggedInUser: UserProfile = {
        ...DEMO_USER,
        email: emailOrUsername.includes('@') ? emailOrUsername : `${emailOrUsername}@squi.health`,
        fullName: mockName.charAt(0).toUpperCase() + mockName.slice(1),
      };

      setUser(loggedInUser);
      setToken('mock_jwt_token_squi_2026');
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'An unexpected login error occurred.' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: { firstName: string; lastName: string; email: string; password: string }): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      if (!data.firstName.trim() || !data.lastName.trim()) {
        return { success: false, error: 'Please enter both first name and last name.' };
      }
      if (!data.email.trim() || !data.email.includes('@')) {
        return { success: false, error: 'Please enter a valid email address.' };
      }
      if (!data.password || data.password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters long.' };
      }

      const newUser: UserProfile = {
        ...DEMO_USER,
        id: `usr_${Date.now()}`,
        email: data.email.trim().toLowerCase(),
        fullName: `${data.firstName.trim()} ${data.lastName.trim()}`,
      };

      setUser(newUser);
      setToken(`mock_jwt_${Date.now()}`);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Registration failed.' };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const googleUser: UserProfile = {
        ...DEMO_USER,
        id: 'usr_google_999',
        email: 'alex.nutri@gmail.com',
        fullName: 'Alex Morgan',
      };
      setUser(googleUser);
      setToken('mock_google_oauth_token');
      return { success: true };
    } catch (e: any) {
      return { success: false, error: 'Google sign-in failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        loginWithGoogle,
        logout,
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
