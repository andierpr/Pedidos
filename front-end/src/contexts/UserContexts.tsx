import { createContext, useState, type ReactNode } from "react";
import type { UserContextType } from "../types/User";

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

// Provider - Prover para o projeto todo

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
