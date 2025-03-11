import React from 'react';
<<<<<<< HEAD
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
  const endDate = new Date('2025-04-08');   // 8 avril 2025
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
=======
import { DataProvider } from './context/DataContext'; // Assurez-vous que le chemin est correct
import MainSite from './Main';
import AdminDashboard from './AdminDashboard';
import PrivateRoute from './PrivateRoute';
import MentionsLegales from './MentionsLegales';
import PolitiqueConfidentialite from './PolitiqueConfidentialite';
import ConditionsGenerales from './ConditionsGenerales';
import Login from './context/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const App = () => {
  // Définir les dates de début et de fin
  const startDate = new Date('2025-03-01'); // 1er mars 2025
  const endDate = new Date('2025-04-08');   // 8 avril 2025
  const currentDate = new Date();

  let content;

  if (currentDate >= startDate && currentDate < endDate) {
    // Affichage normal de l'application pendant la période autorisée
    content = (
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<PrivateRoute element={<AdminDashboard />} />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/conditions-generales" element={<ConditionsGenerales />} />
        {/* Redirection par défaut vers /login si la route n'existe pas */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  } else {
    // Message affiché en dehors de la période
    content = (
      <Routes>
        <Route
          path="*"
          element={<h1>Erreur Chez Heberjahiz, Contacter Nous : 0802 00 2800</h1>}
        />
      </Routes>
    );
  }

  return (
    <DataProvider>
      <Router>{content}</Router>
    </DataProvider>
>>>>>>> 93d4baa9c4b259f572e8cc55f02a3587e8155857
  );
};

export default App;