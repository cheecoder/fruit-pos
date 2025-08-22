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

  useEffect(() => {
    fetch(`${backendUrl}/auth/user`, {
      credentials: "include",
    })
      .then((res) => {
        console.log(res);
        return res.ok ? res.json() : null;
      })
      .then((data) => setUser(data))
      .catch((error) => {
        console.log("error: ", error);
        setUser(null);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
