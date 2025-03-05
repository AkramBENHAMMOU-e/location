import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [hasPrompted, setHasPrompted] = useState(false);

    const correctPassword = 'admin123'; // Hardcoded password (simple option)

    if (!hasPrompted) {
        const password = prompt('Enter the admin password:');
        if (password === correctPassword) {
            setIsAuthorized(true);
        }
        setHasPrompted(true);
    }

    return isAuthorized ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;