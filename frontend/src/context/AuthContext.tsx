import { createContext, useContext, useEffect, useState } from "react";

interface User {
  name: string;
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

  useEffect(() => {
    console.log("user: ", user);
    // fetch current logged-in user on mount
    fetch("/api/me", { credentials: "include" })
      .then((res) => res.json())
      .then(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
