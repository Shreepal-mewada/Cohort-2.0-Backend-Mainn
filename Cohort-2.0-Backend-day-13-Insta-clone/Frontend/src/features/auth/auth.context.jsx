import { createContext } from "react";
import { loginUser, registerUser } from "./services/auth.api";
import { useState } from "react";
export const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleLogin = async (email, password) => {
    setLoading(true); 
    try {   
      const userData = await loginUser(email, password);
      setUser(userData);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false); 
    }
  };
  const handleRegister = async (username, email, password) => {
    setLoading(true); 
    try {
      const userData = await registerUser(username, email, password);
      setUser(userData);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setLoading(false); 
    }
  };

  return (<AuthContext.Provider value={{ user, loading, handleLogin, handleRegister }}>
      {children}
    </AuthContext.Provider>
  );

}
