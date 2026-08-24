import { createContext, useState } from "react";

export const userDataContext = createContext();
export default function UserDataContextProvider({ children }) {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")),
  );

  return (
    <userDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </userDataContext.Provider>
  );
}
