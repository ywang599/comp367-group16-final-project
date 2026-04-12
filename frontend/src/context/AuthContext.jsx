import { createContext, useContext, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { LOGIN, REGISTER, LOGOUT } from "../graphql/mutations";
import { CURRENT_USER } from "../graphql/queries";
import { setToken, removeToken, getToken } from "../utils/token";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authMessage, setAuthMessage] = useState("");

  // Fetch the logged-in user on load
  const { data, loading } = useQuery(CURRENT_USER);

  // When token expires, log out user
  useEffect(() => {
    if (data?.currentUser) {
      setUser(data.currentUser);
      setAuthMessage("");
    } else if (!loading && getToken()) {
      removeToken();
      setUser(null);
      setAuthMessage("Your session has expired. Please log in again.");
    }
  }, [data, loading]);

  const [loginMutation] = useMutation(LOGIN);
  const [registerMutation] = useMutation(REGISTER);
  const [logoutMutation] = useMutation(LOGOUT);

  const login = async (email, password) => {
    const { data } = await loginMutation({ variables: { email, password } });
    setToken(data.login.token);
    setUser(data.login.user);
  };

  const register = async (username, email, password) => {
    const { data } = await registerMutation({ variables: { username, email, password } });
    setToken(data.register.token);
    setUser(data.register.user);
  };

  const logout = async () => {
    await logoutMutation();
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, authMessage, setAuthMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming auth context
export const useAuth = () => useContext(AuthContext);
