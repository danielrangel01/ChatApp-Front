import { useState, useEffect, createContext } from "react";
import { User, auth } from "../api";
import { hasExpiredToken } from "../uitls/token";

const userController = new User();
const authController = new auth();

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    (async () => {
      const accessToken = await authController.getAcessToken();
      const refreshToken = await authController.getRefreshToken();

      console.log(accessToken)

      if (!accessToken || !refreshToken) {
        logout();
        setLoading(false);
        return;
      }

      if (hasExpiredToken(accessToken)) {
        if (hasExpiredToken(refreshToken)) {
          logout();
        } else {
          reLogin(refreshToken);
        }
      } else {
        await login(accessToken);
      }

      setLoading(false);
    })();
  }, []);

  const reLogin = async (refreshToken) => {
    try {
      const { accessToken } = await authController.refreshAcceessToken(
        refreshToken
      );
      await authController.setAcessToken(accessToken);
      await login(accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (accessToken) => {
    try {
      setLoading(true);
      const response = await userController.getMe(accessToken);
      setUser(response);
      setToken(accessToken);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    authController.removeToken(token);
  };

  const updateUser = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  const data = {
    accessToken: token,
    user,
    login,
    logout,
    updateUser,
  };

  if (loading) return;
  null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
