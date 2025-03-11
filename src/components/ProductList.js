// components/ProductList.js
import React from 'react';

function ProductList({ products }) {
  if (!products.length) {
    return <p>Aucun produit disponible.</p>;
  }

  return (
    <div className="product-list">
      <h2>Liste des Produits</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img 
              src={`http://localhost:5000/${product.image_path}`} 
              alt={product.nom} 
              className="product-image" 
            />
            <div className="product-info">
              <h3>{product.nom}</h3>
              <p>Marque: {product.brand}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;