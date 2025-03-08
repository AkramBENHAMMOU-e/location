import React from 'react';
import { DataProvider } from './context/DataContext';
import MainSite from './Main';
import AdminDashboard from './AdminDashboard';
import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
    // Définir les dates de début et de fin
    const startDate = new Date('2025-03-01'); // 1er mars 2024
    const endDate = new Date('2025-04-08');   // 1er avril 2024
    const currentDate = new Date();

    let content;
    
    if (currentDate >= startDate && currentDate < endDate) {
        // Affichage normal de l'application pendant la période autorisée
        content = (
            <Routes>
                <Route path="/" element={<MainSite />} />
                <Route path="/admin/*" element={<PrivateRoute element={<AdminDashboard />} />} />
            </Routes>
        );
    } else {
        // Message affiché en dehors de la période
        content = <h1>Erreur Chez Heberjahiz, Contacter Nous : 0802 00 2800</h1>;
    }

    return (
        <DataProvider>
            <Router>
                {content}
            </Router>
        </DataProvider>
    );
};

export default App;
