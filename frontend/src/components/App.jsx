import '../App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import useAuth from '../hooks/useAuth.jsx';
import AuthProvider from '../contexts/AuthProvider';
import Home from './Home';
import Login from './Login';
import Registration from './Registration';
import NotFound from './NotFound';
import NavBar from './NavBar';
import RenderModal from './modals';
import 'react-toastify/dist/ReactToastify.css';
import routes from '../routes';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.loggedIn ? children : <Navigate to={routes.loginPage()} state={{ from: location }} />
  );
};

const App = () => (
  <AuthProvider>
    <div className="App d-flex flex-column h-100">
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            )}
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<Registration />} />
        </Routes>
      </Router>
      <RenderModal />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  </AuthProvider>
);

export default App;
