import axios from 'axios';
import { createContext, useState } from 'react';
import routes from '../routes';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser);
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = async (username, password) => {
    const { data } = await axios.post(routes.server.login, {username, password});
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    setLoggedIn(true);
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{user, logIn, logOut, loggedIn}}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;




