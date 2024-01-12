import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from '../../routes.js';
import LoginPage from './LoginPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import ChatPage from './ChatPage.jsx';
import Navbar from '../Navbar.jsx';
import { useAuth } from '../../hooks/index.js';
import RegistrationPage from './RegistrationPage.jsx';

const App = () => {
  const auth = useAuth();
  const Redirect = auth.user ? <ChatPage /> : <Navigate to={routes.login} />;

  return (
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={routes.root} element={Redirect} />
          <Route path={routes.signup} element={<RegistrationPage />} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.others} element={<ErrorPage />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </div>

  );
};

export default App;
