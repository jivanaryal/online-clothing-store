import React, { createContext, useState, useContext, useEffect } from "react";
import VerifyToken from "../utils/VerifyToken"; // Adjust the path as necessary

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      const user_id = localStorage.getItem("user_id");
      if (token && user_id) {
        const isValid = await VerifyToken(token);
        setIsAuthenticated(isValid);
      }
      setLoading(false);
    };
    checkToken();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
