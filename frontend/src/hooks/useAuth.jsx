import { useContext } from 'react';
import { AuthContext } from '../context/Auth';

const useAuth = () => useContext(AuthContext);

export default useAuth;
