import { createContext, useContext, useState } from "react";

interface User {
  name: string;
  email: string;
}

const AuthContext = createContext<{
  user: User | null;
  setUser: (u: User | null) => void;
  setToken: (token: string | null) => void;
  token: string | null;
}>({ user: null, setUser: () => {}, setToken: () => {}, token: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedToken = localStorage.getItem("jwt");
    if (storedToken) {
      try {
        const payload = JSON.parse(atob(storedToken.split(".")[1]));
        return { name: payload.name, email: payload.email };
      } catch {
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("jwt")
  );

  const handleSetToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) localStorage.setItem("jwt", newToken);
    else localStorage.removeItem("jwt");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, setToken: handleSetToken, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
