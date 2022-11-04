import "react-toastify/dist/ReactToastify.css";

import React from 'react';

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { toast, ToastContainer } from 'react-toastify';

import AppBar from './components/AppBar'
import Home from './views/Home/Home';
import Login from './views/Login';

const isAuth = () => !!Meteor.userId();

const RequireAuth = ({ children }) => {
  const location = useLocation();

  if (!isAuth()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const location = useLocation();

  if (isAuth()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

const UnknownRoute = () => {
  const location = useLocation();

  if (isAuth()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

const CustomRoutes = () => (
  <BrowserRouter >
    <Routes>
      <Route
        element={
          <RequireAuth>
            <AppBar />
          </RequireAuth>
        }
      >
        <Route path='/' element={<Home />} />
        <Route path='/inventory' element={<Home />} />
      </Route>
      <Route
        path='/login'
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route path='*' element={<UnknownRoute />} />
    </Routes>
    <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
  </BrowserRouter>
);

export default CustomRoutes;