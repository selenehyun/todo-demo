import { createContext, useState, useMemo, useEffect } from "react";
import apiClient from "../libs/api-client";

export const UserContext = createContext({
  getUser() {
    return undefined;
  },
  setUser() {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [initialized, setInitialized] = useState(false);

  const userContext = useMemo(
    () => ({
      getUser() {
        return user;
      },
      setUser(user) {
        setUser(user);
      },
    }),
    [user, setUser]
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClient.getSelf();
        if (data.user) {
          setUser(data.user);
        }
        setInitialized(true);
      } catch (err) {
        // 인증 실패. 로그인 안한것으로 취급한다.
        setInitialized(true);
      }
    })();
  }, []);

  if (!initialized) {
    // 로그인 판단 전에는 rendering block
    return null;
  }

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};
