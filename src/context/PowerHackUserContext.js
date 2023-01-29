import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const PowerHackUserContext = createContext();
export default function PowerHackUserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isApprove, setIsApprove] = useState(false);
  // console.log(localStorage)

  useEffect(() => {
    if (localStorage.getItem("UserToken")) {
      setIsAuthenticating(true);
      axios
        .get("http://localhost:9000/api/current-user", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("UserToken")}`,
            // authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjY3ZWU2NjViMzdmYmI5YTdkOWVkOSIsImlhdCI6MTY3Mzg4OTc0NCwiZXhwIjoxNjczOTExMzQ0fQ.EumFpfWOAzivWXztrV89X_I9iIhY3LMq7XBrILQAPWE`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.result);
            setUser(res.data.result);
          }
        })
        .finally(() => {
          setIsAuthenticating(false);
        });
    }
  }, [localStorage.getItem("UserToken")]);

  const logout = () => {
    setUser({});
    localStorage.removeItem("UserToken");
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
