import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { userService } from "@/services/user";
import { router } from "expo-router";
import { User } from "@/types/user";

interface AuthContextProps {
  isLoggedIn: boolean;
  isLoadingAuth: boolean;
  authenticate: (
    isAuthMode: boolean,
    email: string,
    password: string
  ) => Promise<void>;
  logout: VoidFunction;
  user: User | null;
}

const AuthContext = createContext({} as AuthContextProps);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthenticationProvider = ({ children }: React.PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function checkIfLoggedIn() {
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");

      if (token && user) {
        setIsLoggedIn(true);
        setUser(JSON.parse(user));
        router.replace("/(authed)");
      } else {
        setIsLoggedIn(false);
      }
    }

    checkIfLoggedIn();
  }, []);

  const authenticate = async (
    isAuthMode: boolean,
    email: string,
    password: string
  ) => {
    try {
      setIsLoadingAuth(true);

      const authMode = isAuthMode ? "login" : "register";
      const response = await userService[authMode](email, password);

      if (response) {
        setIsLoggedIn(true);
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        router.replace("/(authed)");
      }
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        authenticate,
        logout,
        isLoggedIn,
        isLoadingAuth,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthenticationProvider };
