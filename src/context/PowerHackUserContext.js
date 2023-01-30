import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const PowerHackUserContext = createContext();
export default function PowerHackUserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isApprove, setIsApprove] = useState(false);
  const [refetch, setrefetch] = useState(false);

  useEffect(() => {
    console.log(localStorage.getItem("userToken"));
    if (localStorage.getItem("userToken")) {
      setIsAuthenticating(true);
      axios
        .get("https://power-hack-server1.onrender.com/api/current-user", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            setUser(res.data.result);
          }
        })
        .finally(() => {
          setIsAuthenticating(false);
        });
    }
  }, []);

  const logout = () => {
    setUser({});
    localStorage.removeItem("userToken");
    setrefetch(true);
  };
  return (
    <PowerHackUserContext.Provider
      value={{
        user,
        setUser,
        logout,
        isAuthenticating,
        isApprove,
        setIsApprove,
      }}
    >
      {children}
    </PowerHackUserContext.Provider>
  );
}
