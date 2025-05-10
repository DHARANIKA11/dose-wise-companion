
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/user";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // In a real app, we would connect to Firebase or another auth service
  useEffect(() => {
    // Simulate checking for a logged-in user
    const storedUser = localStorage.getItem("medicineUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Simulate login delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll create a mock user
      const newUser: User = {
        id: "user1",
        email,
        name: email.split("@")[0],
      };
      
      localStorage.setItem("medicineUser", JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      // Simulate register delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demo purposes, create a mock user
      const newUser: User = {
        id: "user" + Date.now(),
        email,
        name,
      };
      
      localStorage.setItem("medicineUser", JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      localStorage.removeItem("medicineUser");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
