import React, { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const UserAuthContext = createContext();

const UserAuthContextApi = ({ children, login, setLogin, loginData }) => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  console.log(login, loginData);
  const location = useLocation().pathname;

  useEffect(() => {
    const storedToken = localStorage.getItem("token1");

    if (storedToken) {
    
      if (location === "/login") {
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <UserAuthContext.Provider
      value={{
        name: "jivan",
        tkn: token || "", // provide a default value when localStorage is not available
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextApi;