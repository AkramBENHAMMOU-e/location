import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DataProvider, useData } from './context/DataContext'; // Assurez-vous que le chemin est correct
import MainSite from './Main';
import AdminDashboard from './AdminDashboard';
import ProtectedRoute from './ProtectedRoute';
import MentionsLegales from './MentionsLegales';
import PolitiqueConfidentialite from './PolitiqueConfidentialite';
import ConditionsGenerales from './ConditionsGenerales';

const App = () => {
  const { settings } = useData();


  // Définir les dates de début et de fin
  const startDate = new Date('2025-03-01'); // 1er mars 2025
  const endDate = new Date('2030-04-08');   // 8 avril 2025
  const currentDate = new Date();

  return (
    <Router>
      <DataProvider>
        <Routes>
          {currentDate >= startDate && currentDate < endDate ? (
            <>
              <Route path="/" element={<MainSite />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute correctPassword={settings.password}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
              <Route path="/conditions-generales" element={<ConditionsGenerales />} />
            </>
          ) : (
            <Route path="*" element={<h1>Erreur Chez Heberjahiz, Contactez-nous : 0802 00 2800</h1>} />
          )}
        </Routes>
      </DataProvider>
    </Router>
  );
};

export default App;