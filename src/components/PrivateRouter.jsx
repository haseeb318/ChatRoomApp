import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const PrivateRouter = () => {
  const {user} = useAuth()
  // console.log("userrr",user)

  return user ? <Outlet /> : <Navigate to="/login" />; 
};

export default PrivateRouter;
