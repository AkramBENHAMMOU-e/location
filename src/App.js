import React from 'react';
import { DataProvider } from './context/DataContext';
import MainSite from './Main';
import AdminDashboard from './AdminDashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
   <DataProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </Router>
    </DataProvider> 
  );
};
export default App;

// App.js
/*import React, { useState, useEffect } from 'react';
import './App.css';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductAdded = () => {
    fetchProducts();
  };

  return (
    <div className="App">
      <h1>Gestion de Produits</h1>
      <ProductForm onProductAdded={handleProductAdded} />
      {isLoading ? (
        <p>Chargement des produits...</p>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
}

export default App;*/