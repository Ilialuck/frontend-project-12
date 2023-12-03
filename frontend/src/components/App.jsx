import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import routes from '../routes.js';
import { LoginPage } from './pages/LoginPage.jsx';
import { ErrorPage } from './pages/ErrorPage.jsx';
import { ChatPage } from './pages/ChatPage.jsx';
import useAuth from '../hooks/useAuth.jsx';

const App = () => {
  const { loggedIn } = useAuth();
  const Redirect = loggedIn ? <ChatPage /> : <Navigate to={routes.login} />

  return (
    <BrowserRouter>
        <Routes>
           <Route path={routes.root} element={ Redirect }/>
          <Route path={routes.login} element={<LoginPage />}/>
          <Route path={routes.others} element={<ErrorPage />}/>
        </Routes>
    </ BrowserRouter>
  );
}

export default App;