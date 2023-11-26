import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from '../routes.js';
import { LoginPage } from './pages/LoginPage.jsx';
import { ErrorPage } from './pages/ErrorPage.jsx';

const App = () => {
  
  return (
    <BrowserRouter>
        <Routes>
          <Route path={routes.login} element={<LoginPage />}/>
          <Route path={routes.others} element={<ErrorPage />}/>
        </Routes>
    </ BrowserRouter>
  );
}

export default App;