import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import VerifyToken from "../utils/VerifyToken";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  logout: () => void;
}

// Initialize the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Loading state to ensure auth is checked before rendering

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      
      if (token) {
        const isValid = await VerifyToken(token);
        setIsAuthenticated(isValid); // Set authenticated if token is valid
      } else {
        setIsAuthenticated(false); // No token found, not authenticated
      }

      setLoading(false); // Loading finished
    };

    checkToken(); // Verify token on component mount
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, setIsAuthenticated, logout }}>
      {loading ? <div>Loading...</div> : children} {/* Render children when not loading */}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
