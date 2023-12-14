import { useContext } from 'react';
import { AuthContext } from '../context/Auth';
import { SocketContext } from '../context/Socket';


export const useAuth = () => useContext(AuthContext);
export const useSocket = () => useContext(SocketContext);
