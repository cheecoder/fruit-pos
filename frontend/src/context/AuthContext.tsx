import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  name: { givenName: string };
  email: string;
}

const AuthContext = createContext<{
  user: User | null;
  setUser: (u: User | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const backendUrl =
    import.meta.env.MODE === "production"
      ? "https://fruit-pos-bfoa.onrender.com"
      : "http://localhost:3000";
  const api = axios.create({
    baseURL: `${backendUrl}`,
    withCredentials: true,
  });
  async function getCurrentUser() {
    try {
      const response = await api.get("/auth/user");
      console.log("User:", response.data);
      setUser(response.data);
      return response.data;
    } catch (err: any) {
      if (err.response?.status === 401) {
        console.log("Not authenticated");
        setUser(null);
        return null;
      }
      throw err;
    }
  }
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
