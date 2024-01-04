import {
  createContext, useState, useCallback, useMemo,
} from 'react';
import axios from 'axios';
import routes from '../routes';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser);

  const logIn = useCallback(async (username, password) => {
    const { data } = await axios.post(routes.server.login, {
      username,
      password,
    });
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  }, []);

  const logOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const context = useMemo(() => ({ logIn, user, logOut }), [logIn, user, logOut]);
  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
