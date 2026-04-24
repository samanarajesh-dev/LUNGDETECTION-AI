import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext({});

const GUEST_USER = {
  id: 'guest-user',
  email: 'guest@lungdetect.ai',
  user_metadata: { first_name: 'Guest', last_name: 'User', role: 'patient' },
  isGuest: true,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };
    
    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (identifier, password, isRegistering = false, extraData = {}) => {
    try {
      // Convert Doctor ID (no @) to email format for Supabase
      const email = identifier.includes('@')
        ? identifier
        : `${identifier}@doctor.lungdetect.ai`;

      if (isRegistering) {
        // SIGN UP — store credentials in Supabase (email confirmation must be OFF in dashboard)
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: extraData.first_name || '',
              last_name: extraData.last_name || '',
              role: extraData.role || 'patient',
            }
          }
        });
        if (error) return { error: error.message };
        return { error: null, data: data.user };

      } else {
        // LOGIN — validate credentials strictly
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) return { error: 'Invalid credentials. Please check your email and password.' };
        return { error: null, data: data.user };
      }
    } catch(err) {
      console.error('[Auth] Exception:', err);
      return { error: 'Network error. Please try again.' };
    }
  };

  const signInWithGoogle = async (idToken) => {
    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      });
      if (error) return { error: error.message };
      return { error: null };
    } catch(err) {
      console.error(err);
      return { error: "Network error with Google sign in via Supabase" };
    }
  };

  const simulateGoogleLogin = async () => {
    try {
      const mockEmail = `google_${Math.random().toString(36).substring(2,7)}@simulated.com`;
      const mockPassword = "simulated_password_123!";
      const { data, error } = await supabase.auth.signUp({
        email: mockEmail,
        password: mockPassword,
        options: {
          data: { first_name: "Simulated", last_name: "Google User" }
        }
      });
      if (error) return { error: error.message };
      return { error: null, data: data.user };
    } catch(err) {
      console.error(err);
      return { error: "Failed to create highly realistic simulation account" };
    }
  };

  const loginAsGuest = () => {
    setUser(GUEST_USER);
  };

  const signOut = async () => {
    if (user?.isGuest) {
      setUser(null);
      return;
    }
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signInWithGoogle, simulateGoogleLogin, loginAsGuest, signOut, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
