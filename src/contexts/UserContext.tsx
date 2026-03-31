import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "atendente";

export interface AppUser {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: UserRole;
  roleLabel: string;
}

export const mockUsers: AppUser[] = [
  { id: "u1", name: "Rafael Soares", initials: "RS", email: "rafael@soareshub.com", role: "admin", roleLabel: "Administrador" },
  { id: "u2", name: "Juliana Costa", initials: "JC", email: "juliana@soareshub.com", role: "atendente", roleLabel: "Atendente" },
  { id: "u3", name: "Carlos Mendes", initials: "CM", email: "carlos@soareshub.com", role: "atendente", roleLabel: "Atendente" },
];

interface UserContextType {
  currentUser: AppUser;
  setCurrentUser: (user: AppUser) => void;
  isAdmin: boolean;
  allUsers: AppUser[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AppUser>(mockUsers[0]);

  return (
    <UserContext.Provider value={{
      currentUser,
      setCurrentUser,
      isAdmin: currentUser.role === "admin",
      allUsers: mockUsers,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
