import React from 'react';
import { Navigate } from 'react-router-dom';
import { useData } from './context/DataContext';

const PrivateRoute = ({ element }) => {
  const { admin } = useData();
  return admin ? element : <Navigate to="/login" />;
};

export default PrivateRoute;