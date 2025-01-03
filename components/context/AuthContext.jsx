'use client'
// contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`https://sportify-1haq.onrender.com/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch(() => localStorage.removeItem("token"));
    }
    setLoading(false);
    setIsAuthenticated(true);
  }, []);

  const login = async (email, password) => {
    const res = await fetch(`https://sportify-1haq.onrender.com/auth/signin`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},

      body: JSON.stringify({ email: email, password: password })
    });
    const data = await res.json();
    if(data)
      {    
      const token = data.access_token
      localStorage.setItem("token", token);
      console.log(token);
      setIsAuthenticated(true);

      const user_data = await fetch(`https://sportify-1haq.onrender.com/users/me`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`}}).then((res) => res.json());
      setUser(user_data);
      console.log(user_data);
      
      router.push("/");
      }

  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
