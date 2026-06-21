"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { generateJWT, saveUser, getMe } from "@/lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data: session, isPending } = useSession();
  const [token, setToken] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initUser = async () => {
      if (session?.user) {
        try {
          // Save user to DB
          await saveUser({
            name: session.user.name,
            email: session.user.email,
            image: session.user.image || "",
            role: "user",
          });
          // Get JWT
          const { token: jwt } = await generateJWT(session.user.email);
          setToken(jwt);
          localStorage.setItem("legalease_token", jwt);
          // Get DB user (with role)
          const user = await getMe(jwt);
          setDbUser(user);
        } catch (err) {
          console.error(err);
        }
      } else {
        setToken(null);
        setDbUser(null);
        localStorage.removeItem("legalease_token");
      }
      setLoading(false);
    };

    if (!isPending) initUser();
  }, [session, isPending]);

  const logout = async () => {
    await signOut();
    setToken(null);
    setDbUser(null);
    localStorage.removeItem("legalease_token");
  };

  return (
    <AuthContext.Provider value={{ session, token, dbUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);