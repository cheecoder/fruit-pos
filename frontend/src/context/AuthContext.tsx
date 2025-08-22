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

  useEffect(() => {
    console.log("user: ", user);
    // fetch current logged-in user on mount
    fetch("/api/me", { credentials: "include" })
      .then((res) => res.json())
      .then(setUser);
  }, []);
  const backendUrl =
    import.meta.env.MODE === "production"
      ? "https://fruit-pos-bfoa.onrender.com"
      : "http://localhost:3000";

  useEffect(() => {
    fetch(`${backendUrl}/auth/user`, {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
