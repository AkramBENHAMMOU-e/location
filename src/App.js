import React from 'react';
import { DataProvider } from './context/DataContext';
import MainSite from './Main';
import AdminDashboard from './AdminDashboard';
import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <DataProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<MainSite />} />
                    <Route
                        path="/admin/*"
                        element={<PrivateRoute element={<AdminDashboard />} />}
                    />
                </Routes>
            </Router>
        </DataProvider>
    );
};

export default App;