import { createContext, useContext, useEffect, useState } from "react";
type UserDataTypes<T> = null | undefined | T;
interface UserData {
  name: string;
  email: string;
}
interface UserDataContext {
  userData: UserDataTypes<UserData>;
  handleSetUserData: (data: UserData) => void;
}
const UserDataContext =
  createContext<UserDataTypes<UserDataContext>>(undefined);

export default function UserDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<UserDataTypes<UserData>>(undefined);
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else setUserData(null);
  }, []);
  function handleSetUserData(data: UserData) {
    setUserData(data);
    localStorage.setItem("userData", JSON.stringify(data));
  }
  const contextValue: UserDataContext = {
    userData,
    handleSetUserData,
  };
  return (
    <UserDataContext.Provider value={contextValue}>
      {children}
    </UserDataContext.Provider>
  );
}
export function useUserDataContext() {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error(
      "UserDataContext must be used within a UserDataContextProvider"
    );
  }
  return context;
}
